package com.challange.mbge.domain

import com.challange.mbge.persistence.Score as PersistenceScore
import com.challange.mbge.persistence.ScoreService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension

@ExtendWith(MockitoExtension::class)
class GameServiceTest {

    val testName = "Testy McTest"

    @Mock
    lateinit var scoreService: ScoreService

    lateinit var gameService: GameService

    @BeforeEach
    fun setup() {
        gameService = GameService(-10, 10, scoreService)
    }

    @Nested
    @DisplayName("#gamble")
    inner class Gamble {

        @Test
        @DisplayName("should return a new high score when no score existed")
        fun noScoreExists() {
            `when`(scoreService.getScoreByName(testName)).thenReturn(null)

            val result = gameService.gamble(testName)

            assertThat(result.type).isEqualTo(ScoreResultType.NEW_HIGH_SCORE)
            verify(scoreService, times(1)).setScoreByName(safeEq(testName), anyInt())
        }

        @Test
        @DisplayName("should return a new high score when new score is greater than previous")
        fun newScoreIsGreater() {
            `when`(scoreService.getScoreByName(testName)).thenReturn(PersistenceScore(name = testName, value = -20))

            val result = gameService.gamble(testName)

            assertThat(result.type).isEqualTo(ScoreResultType.NEW_HIGH_SCORE)
            verify(scoreService, times(1)).setScoreByName(safeEq(testName), anyInt())
        }

        @Test
        @DisplayName("should return no new high score when new score is smaller than previous")
        fun newScoreIsSmaller() {
            `when`(scoreService.getScoreByName(testName)).thenReturn(PersistenceScore(name = testName, value = 20))

            val result = gameService.gamble(testName)

            assertThat(result.type).isEqualTo(ScoreResultType.NO_NEW_HIGH_SCORE)
            verify(scoreService, times(0)).setScoreByName(safeEq(testName), anyInt())
        }
    }

    @Nested
    @DisplayName("#getHighScores")
    inner class GetHighScore {

        @Test
        @DisplayName("should return high scores")
        fun newScoreIsGreater() {
            `when`(scoreService.getAllScores()).thenReturn(listOf(
                    PersistenceScore(name = "Foo", value = 1),
                    PersistenceScore(name = "Bar", value = 2)
            ))

            val result = gameService.getHighScores()

            assertThat(result.size).isEqualTo(2)
            assertThat(result[0].name).isEqualTo("Foo")
            assertThat(result[0].value).isEqualTo(1)
            assertThat(result[1].name).isEqualTo("Bar")
            assertThat(result[1].value).isEqualTo(2)
        }
    }
}

fun <T : Any> safeEq(value: T): T = eq(value) ?: value
