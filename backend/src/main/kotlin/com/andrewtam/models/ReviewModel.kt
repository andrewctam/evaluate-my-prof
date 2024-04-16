package com.andrewtam

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer

@Document("review")
data class Review(
    @Id
    @JsonSerialize(using= ToStringSerializer::class)
    val id: ObjectId = ObjectId(),

    @JsonSerialize(using= ToStringSerializer::class)
    var author: ObjectId,
    
    var authorName: String,
    var course: String,
    var rating: Int,
    var difficulty: Int,
    var amountLearned: Int,
    var lectureQuality: Int,
    var hrsPerWeek: Int,
    var text: String,
    val created: Date = Date(),
    var votes: Int = 0,
    var comments: List<Comment> = listOf(),
)

data class Comment (
    @Id
    @JsonSerialize(using= ToStringSerializer::class)
    val id: ObjectId = ObjectId(),

    @JsonSerialize(using= ToStringSerializer::class)
    var poster: ObjectId,

    var posterName: String,
    var text: String,
)
