package com.challange.mbge.persistence

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import java.util.*
import javax.persistence.*

@Repository
@Transactional(propagation = Propagation.MANDATORY)
interface ScoreRepository : JpaRepository<Score, Long> {
        @Transactional
        fun findByName(name: String): Score?
}

@Entity
@Table(name = "score")
data class Score(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "id")
        val id: UUID? = null,
        val name: String = "",
        var value: Int = 0
)
