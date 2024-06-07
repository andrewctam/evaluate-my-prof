package com.andrewtam

import java.util.*
import kotlin.jvm.optionals.getOrNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

fun verifySessionToken(user: User, sessionToken: String): Boolean {
    val encoder = BCryptPasswordEncoder()

    return (user.sessionExpiration.after(Date()) &&
            encoder.matches(sessionToken, user.sessionTokenHash))
}

@RestController
@RequestMapping("/reviews")
class ReviewController(
        @Autowired val userRepo: UserRepo,
        @Autowired val reviewRepo: ReviewRepo,
        @Autowired val schoolRepo: SchoolRepo
) {

    @GetMapping("/all")
    fun getReviews(): List<Review> {
        return reviewRepo.findAllByOrderByCreatedDesc()
    }

    @PostMapping("/filter")
    fun getFilteredReviews(@RequestBody body: FilteredReviewsRequest): List<Review> {
        // TODO : Do filtering on the DB side
        return reviewRepo.findAllByOrderByCreatedDesc().filter {
            (body.authorName == "" || it.authorName == body.authorName) &&
                    (body.schoolName == "" || it.schoolName == body.schoolName) &&
                    (body.profName == "" || it.profName == body.profName)
        }
    }

    @PostMapping("/create")
    fun createReview(@RequestBody body: CreateReviewRequest): ResponseEntity<MessageResponse> {
        val user = userRepo.findByUsername(body.authorUsername)

        if (user == null) {
            return ResponseEntity.badRequest().body(MessageResponse("User not found"))
        }
        if (!verifySessionToken(user, body.sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid session token"))
        }

        val school = schoolRepo.findByName(body.schoolName)
        if (school == null) {
            return ResponseEntity.badRequest().body(MessageResponse("School not found"))
        }

        if (school.professors.none { it == body.profName }) {
            return ResponseEntity.badRequest().body(MessageResponse("Professor not found"))
        }

        val review =
            Review(
                    schoolName = body.schoolName,
                    profName = body.profName,
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
    fun voteReview(@RequestBody body: VoteRequest): ResponseEntity<MessageResponse> {

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
    fun commentReview(@RequestBody body: CommentRequest): ResponseEntity<MessageResponse> {

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

        val comment = Comment(poster = user.id, posterName = user.username, text = body.text)

        review.comments += comment

        reviewRepo.save(review)

        return ResponseEntity.ok(MessageResponse("Comment successfully added"))
    }

    @PostMapping("/delete")
    fun deleteReview(@RequestBody body: DeleteReviewRequest): ResponseEntity<MessageResponse> {
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

        if (review.author != user.id) {
            return ResponseEntity.badRequest().body(MessageResponse("Not the owner of the review"))
        }

        reviewRepo.deleteById(body.reviewId)
        return ResponseEntity.ok(MessageResponse("Review deleted"))
    }
}
