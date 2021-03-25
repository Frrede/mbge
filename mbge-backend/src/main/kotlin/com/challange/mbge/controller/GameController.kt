package com.challange.mbge.controller

import com.challange.mbge.domain.GameService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

@RestController
@RequestMapping("/score")
class GameController(val gameService: GameService) {

    @Operation(summary = "Get high scores")
    @GetMapping
    @CrossOrigin
    fun getAllScores(): AllScoresResponseDto {
        return AllScoresResponseDto(gameService.getHighScores().map { entry -> ScoreResponseDto(entry.name, entry.value) });
    }

    @Operation(summary = "Gamble and get result")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Returns the score result"),
        ApiResponse(
                responseCode = "400",
                description = "Name must be not empty",
                content =  [
                    Content(
                            mediaType = "application/json",
                            schema = Schema(implementation = ErrorResponse::class)
                    )
                ]
        )
    ])
    @ResponseStatus(HttpStatus.OK)
    @PostMapping
    @CrossOrigin
    fun gamble(@Valid @RequestBody scoreResponseDto: ScoreRequestDto): SendScoreResponseDto {
        val gambleResult = gameService.gamble(scoreResponseDto.name)
        return SendScoreResponseDto(
                ScoreResultDto.valueOf(gambleResult.type.toString()),
                ScoreResponseDto(scoreResponseDto.name, gambleResult.value)
        )
    }
}

data class AllScoresResponseDto(val scoreList: List<ScoreResponseDto>)

data class ScoreResponseDto(val name: String, val value: Int)

data class ScoreRequestDto(
        @field:NotEmpty(message = "Name must be not empty")
        val name: String = ""
)

data class SendScoreResponseDto(val result: ScoreResultDto, val score: ScoreResponseDto)

enum class ScoreResultDto {
    NEW_HIGH_SCORE, NO_NEW_HIGH_SCORE
}
