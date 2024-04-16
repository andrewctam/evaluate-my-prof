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

    @PostMapping("/register")
    fun register(@RequestBody body: RegisterRequest): ResponseEntity<MessageResponse> {
        if (userRepo.findByUsername(body.username) != null || userRepo.findByEmail(body.email) != null) {
            return ResponseEntity.badRequest().build()
        }

        val encoder = BCryptPasswordEncoder()
        val hash = encoder.encode(body.password)

        val user = User(username = body.username, passwordHash = hash, email = body.email)

        val sessionToken = generateSessionToken()
        user.sessionTokenHash = encoder.encode(sessionToken)
        user.sessionExpiration = Date(System.currentTimeMillis() + SESSION_DURATION)

        userRepo.insert(user)

        return ResponseEntity.ok(MessageResponse(sessionToken))
    }

    @PostMapping("/login")
    fun login(@RequestBody body: LoginRequest): ResponseEntity<MessageResponse> {
        val user = userRepo.findByUsername(body.username)

        if (user == null) {
            return ResponseEntity.badRequest().build()
        }

        val encoder = BCryptPasswordEncoder()

        if (!encoder.matches(body.password, user.passwordHash)) {
            return ResponseEntity.badRequest().build()
        }

        val sessionToken = generateSessionToken()
        user.sessionTokenHash = encoder.encode(sessionToken)
        user.sessionExpiration = Date(System.currentTimeMillis() + SESSION_DURATION)

        userRepo.save(user)

        return ResponseEntity.ok(MessageResponse(sessionToken))
    }
}
