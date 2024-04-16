package com.andrewtam

import org.springframework.data.mongodb.repository.MongoRepository

interface ReviewRepo : MongoRepository<Review, String> {
    
    fun findByAuthor(author: User): List<Review>    
}