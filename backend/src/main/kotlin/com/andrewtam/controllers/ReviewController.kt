package com.andrewtam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.andrewtam.MessageResponse
import kotlin.jvm.optionals.getOrNull

fun verifySessionToken(user: User, sessionToken: String): Boolean {
    val encoder = BCryptPasswordEncoder()

    return (user.sessionExpiration.before(Date()) && 
        encoder.matches(sessionToken, user.sessionTokenHash))
}

@RestController
@RequestMapping("/reviews")
class ReviewController(@Autowired val userRepo: UserRepo, @Autowired val reviewRepo: ReviewRepo) {

    @GetMapping("/all")
    fun getReviews(): List<Review> {
        return reviewRepo.findAll()
    }

    @PostMapping("/create")
    fun createReview(
            authorUsername: String,
            @RequestBody sessionToken: String,
            @RequestBody text: String,
            @RequestBody course: String,
            @RequestBody rating: Int,
            @RequestBody difficulty: Int,
            @RequestBody amountLearned: Int,
            @RequestBody lectureQuality: Int,
            @RequestBody hrsPerWeek: Int    
        ) : ResponseEntity<MessageResponse> {

        val user = userRepo.findByUsername(authorUsername)

        if (user == null || !verifySessionToken(user, sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        val review = Review(
            author = user.id,
            text = text,
            course = course,
            rating = rating,
            difficulty = difficulty,
            amountLearned = amountLearned,
            lectureQuality = lectureQuality,
            hrsPerWeek = hrsPerWeek
        )

        reviewRepo.insert(review)

        return ResponseEntity.ok(MessageResponse("Review successfully created"))
    }

    @PostMapping("/vote")
    fun voteReview(
            @RequestBody authorUsername: String,
            @RequestBody sessionToken: String,
            @RequestBody reviewId: String,
            @RequestBody vote: Int
        ) : ResponseEntity<MessageResponse> {

        val user = userRepo.findByUsername(authorUsername)

        if (user == null || !verifySessionToken(user, sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        val review = reviewRepo.findById(reviewId).getOrNull()

        if (review == null) {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        if (vote == 1) {
            review.votes += 1
        } else if (vote == -1) {
            review.votes -= 1
        } else {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        reviewRepo.save(review)

        return ResponseEntity.ok(MessageResponse("Vote successfully added"))
    }

    @PostMapping("/comment")
    fun commentReview(
            @RequestBody authorUsername: String,
            @RequestBody sessionToken: String,
            @RequestBody reviewId: String,
            @RequestBody text: String
        ) : ResponseEntity<MessageResponse> {

        val user = userRepo.findByUsername(authorUsername)

        if (user == null || !verifySessionToken(user, sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        val review = reviewRepo.findById(reviewId).getOrNull()

        if (review == null) {
            return ResponseEntity.badRequest().body(MessageResponse("Error"))
        }

        val comment = Comment(
            poster = user.id,
            text = text
        )

        review.comments += comment

        reviewRepo.save(review)

        return ResponseEntity.ok(MessageResponse("Comment successfully added"))
    }
}