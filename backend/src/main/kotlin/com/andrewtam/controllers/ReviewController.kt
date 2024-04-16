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

    return (user.sessionExpiration.after(Date()) && 
        encoder.matches(sessionToken, user.sessionTokenHash))
}

@RestController
@RequestMapping("/reviews")
class ReviewController(@Autowired val userRepo: UserRepo, @Autowired val reviewRepo: ReviewRepo) {

    @GetMapping("/all")
    fun getReviews(): List<Review> {
        return reviewRepo.findAll()
    }

    @GetMapping("/user/{username}")
    fun getUserReviews(@PathVariable("username") username: String): ResponseEntity<ProfileResponse>{
        val user = userRepo.findByUsername(username)

        if (user == null) {
            return ResponseEntity.notFound().build()
        }

        val reviews = reviewRepo.findByAuthor(user.id)
        return ResponseEntity.ok(ProfileResponse(reviews))
    }

    @PostMapping("/create")
    fun createReview(@RequestBody body: CreateReviewRequest) : ResponseEntity<MessageResponse> {
        val user = userRepo.findByUsername(body.authorUsername)

        if (user == null) {
            return ResponseEntity.badRequest().body(MessageResponse("User not found"))
        }
        if (!verifySessionToken(user, body.sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid session token"))
        }

        val review = Review(
            author = user.id,
            authorName = user.username,
            text = body.text,
            course = body.course,
            rating = body.rating,
            difficulty = body.difficulty,
            amountLearned = body.amountLearned,
            lectureQuality = body.lectureQuality,
            hrsPerWeek = body.hrsPerWeek
        )

        reviewRepo.insert(review)

        return ResponseEntity.ok(MessageResponse("Review successfully created"))
    }

    @PostMapping("/vote")
    fun voteReview(@RequestBody body: VoteRequest) : ResponseEntity<MessageResponse> {

        val user = userRepo.findByUsername(body.authorUsername)

        if (user == null) {
            return ResponseEntity.badRequest().body(MessageResponse("User not found"))
        }
        if (!verifySessionToken(user, body.sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid session token"))
        }

        val review = reviewRepo.findById(body.reviewId).getOrNull()

        if (review == null) {
            return ResponseEntity.badRequest().body(MessageResponse("Review not found"))
        }

        if (body.vote != 1 && body.vote != -1) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid vote: " + body.vote))
        }

        review.votes += body.vote
        reviewRepo.save(review)

        return ResponseEntity.ok(MessageResponse("Vote successfully added"))
    }

    @PostMapping("/comment")
    fun commentReview(@RequestBody body: CommentRequest) : ResponseEntity<MessageResponse> {

        val user = userRepo.findByUsername(body.authorUsername)

        if (user == null) {
            return ResponseEntity.badRequest().body(MessageResponse("User not found"))
        }
        if (!verifySessionToken(user, body.sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid session token"))
        }

        val review = reviewRepo.findById(body.reviewId).getOrNull()

        if (review == null) {
            return ResponseEntity.badRequest().body(MessageResponse("Review not found"))
        }

        val comment = Comment(
            poster = user.id,
            posterName = user.username,
            text = body.text
        )

        review.comments += comment

        reviewRepo.save(review)

        return ResponseEntity.ok(MessageResponse("Comment successfully added"))
    }
}
