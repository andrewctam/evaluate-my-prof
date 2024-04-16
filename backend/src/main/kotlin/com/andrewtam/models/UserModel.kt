package com.andrewtam

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*

@Document("user")
data class User(
    @Id
    val id: ObjectId = ObjectId(),
    var username: String,
    var passwordHash: String,
    var email: String,
    var votes: Int = 0,
    var reviewCount: Int = 0,
    var sessionTokenHash: String = "",
    var sessionExpiration: Date = Date(0),
)

