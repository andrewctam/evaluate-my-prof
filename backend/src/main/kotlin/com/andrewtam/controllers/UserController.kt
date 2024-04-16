package com.andrewtam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.andrewtam.OkResponse

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

    @PostMapping
    fun createAccount(@RequestBody username: String, @RequestBody password: String, @RequestBody email: String): ResponseEntity<OkResponse> {
        if (userRepo.findByUsername(username) != null || userRepo.findByEmail(email) != null) {
            return ResponseEntity.badRequest().build()
        }

        val encoder = BCryptPasswordEncoder()
        val hash = encoder.encode(password)

        val user = User(username = username, passwordHash = hash, email = email)
        userRepo.insert(user)

        return ResponseEntity.ok(OkResponse("Account successfully created"))
    }

    // @PostMapping("/addByParams")
    // fun postRestaurantAsParams(@RequestBody restaurant: Restaurant): Restaurant {
    //     return repo.insert(restaurant)
    // }

    // @DeleteMapping("/{id}")
    // fun deleteRestaurant(@PathVariable("id") id: String) {
    //     repo.findByRestaurantId(id)?.let {
    //         repo.delete(it)
    //     }
    // }

    // @PatchMapping("/{id}")
    // fun updateRestaurant(@PathVariable("id") id: String): Restaurant? {
    //     return repo.findByRestaurantId(restaurantId = id)?.let {
    //         repo.save(it.copy(name = "Update"))
    //     }
    // }
}