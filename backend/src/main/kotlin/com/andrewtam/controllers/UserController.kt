package com.andrewtam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.andrewtam.MessageResponse
import java.security.SecureRandom

const val SESSION_DURATION = 86400000

fun generateSessionToken(): String {
    val random = SecureRandom()
    val bytes = ByteArray(24)
    random.nextBytes(bytes)

    return Base64.getEncoder().encodeToString(bytes)
}

@RestController
@RequestMapping("/users")
class UserController(@Autowired val userRepo: UserRepo, @Autowired val reviewRepo: ReviewRepo) {

    @GetMapping("/{username}")
    fun getUserProfile(@PathVariable("id") id: String): ResponseEntity<ProfileResponse>{
        val user = userRepo.findByUsername(id)

        if (user == null) {
            return ResponseEntity.notFound().build()
        }

        val reviews = reviewRepo.findByAuthor(user)

        return ResponseEntity.ok(ProfileResponse(user.votes, user.reviewCount, reviews))
    }

    @PostMapping("/createAccount")
    fun createAccount(@RequestBody username: String, @RequestBody password: String, @RequestBody email: String): ResponseEntity<MessageResponse> {
        if (userRepo.findByUsername(username) != null || userRepo.findByEmail(email) != null) {
            return ResponseEntity.badRequest().build()
        }

        val encoder = BCryptPasswordEncoder()
        val hash = encoder.encode(password)

        val user = User(username = username, passwordHash = hash, email = email)

        val sessionToken = generateSessionToken()
        user.sessionTokenHash = encoder.encode(sessionToken)
        user.sessionExpiration = Date(System.currentTimeMillis() + SESSION_DURATION)

        userRepo.insert(user)

        return ResponseEntity.ok(MessageResponse(sessionToken))
    }

    @PostMapping("/login")
    fun login(@RequestBody username: String, @RequestBody password: String): ResponseEntity<MessageResponse> {
        val user = userRepo.findByUsername(username)

        if (user == null) {
            return ResponseEntity.badRequest().build()
        }

        val encoder = BCryptPasswordEncoder()

        if (!encoder.matches(password, user.passwordHash)) {
            return ResponseEntity.badRequest().build()
        }

        val sessionToken = generateSessionToken()
        user.sessionTokenHash = encoder.encode(sessionToken)
        user.sessionExpiration = Date(System.currentTimeMillis() + SESSION_DURATION)

        userRepo.save(user)

        return ResponseEntity.ok(MessageResponse(sessionToken))
    }
}
