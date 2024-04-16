package com.andrewtam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.andrewtam.OkResponse
import kotlin.jvm.optionals.getOrNull

@RestController
@RequestMapping("/reviews")
class ReviewController(@Autowired val userRepo: UserRepo, @Autowired val reviewRepo: ReviewRepo) {

    @GetMapping("/all")
    fun getReviews(): List<Review> {
        return reviewRepo.findAll()
    }

    @PostMapping
    fun createReview(@RequestBody review: Review): ResponseEntity<OkResponse> {
        val user = userRepo.findById(review.author.toString()).getOrNull()

        if (user == null) {
            return ResponseEntity.badRequest().body(OkResponse("User not found"))
        }

        reviewRepo.insert(review)

        return ResponseEntity.ok(OkResponse("Review successfully created"))
    }
}