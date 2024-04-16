package com.andrewtam

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer

@Document("user")
data class User(
    @Id
    @JsonSerialize(using= ToStringSerializer::class)
    val id: ObjectId = ObjectId(),
    
    var username: String,
    var passwordHash: String,
    var email: String,
    var sessionTokenHash: String = "",
    var sessionExpiration: Date = Date(0),
)

