package com.andrewtam

import org.springframework.data.mongodb.repository.MongoRepository
import org.bson.types.ObjectId

interface ReviewRepo : MongoRepository<Review, String> {
    fun findByAuthor(author: ObjectId): List<Review>    
}