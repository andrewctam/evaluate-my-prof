package com.andrewtam

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*

@Document("review")
data class Review(
    @Id
    val id: ObjectId = ObjectId(),
    var author: ObjectId,
    var course: String,
    var rating: Int,
    var difficulty: Int,
    var amountLearned: Int,
    var lectureQuality: Int,
    var hrsPerWeek: Int,
    var text: String,
    var votes: Int,
    var comments: List<Comment>,
)

data class Comment (
    @Id
    val id: ObjectId = ObjectId(),
    var poster: ObjectId,
    var text: String,
)
