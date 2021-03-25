package com.challange.mbge.persistence

import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service


@Service
class ScoreService(val scoreRepository: ScoreRepository) {

    fun getAllScores(): List<Score> {
        return scoreRepository.findAll(Sort.by(Sort.Direction.DESC, "value"))
    }

    fun getScoreByName(name: String): Score? {
        return scoreRepository.findByName(name)
    }

    fun setScoreByName(name: String, value: Int) {
        val entry = scoreRepository.findByName(name)
        if (entry != null) {
            entry.value = value
            scoreRepository.save(entry)
        } else {
            scoreRepository.save(Score(name = name, value = value))
        }
    }
}

