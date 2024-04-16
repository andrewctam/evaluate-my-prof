package com.andrewtam

import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepo : MongoRepository<User, String> {
    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
}