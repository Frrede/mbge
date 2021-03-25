package com.challange.mbge.domain

import com.challange.mbge.persistence.ScoreService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class GameService(
        @Value("\${gamble.minValue}")
        val minValue: Int,
        @Value("\${gamble.maxValue}")
        val maxValue: Int,
        val scoreService: ScoreService
) {

    fun gamble(name: String): ScoreResult {
        val currentScore = scoreService.getScoreByName(name)
        val newScore = (minValue..maxValue).random()

        if (currentScore == null || newScore > currentScore.value) {
            scoreService.setScoreByName(name, newScore)
            return ScoreResult(ScoreResultType.NEW_HIGH_SCORE, newScore);
        }
        return ScoreResult(ScoreResultType.NO_NEW_HIGH_SCORE, newScore);
    }

    fun getHighScores(): List<Score> {
        return scoreService.getAllScores().map { score -> Score(score.name, score.value) }
    }
}

data class ScoreResult(val type: ScoreResultType, val value: Int)

enum class ScoreResultType {
    NEW_HIGH_SCORE, NO_NEW_HIGH_SCORE
}

data class Score(val name: String, val value: Int)
