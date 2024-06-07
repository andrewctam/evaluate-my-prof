package com.andrewtam

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer

@Document("school")
data class School(
    @Id
    @JsonSerialize(using= ToStringSerializer::class)
    val id: ObjectId = ObjectId(),
    
    var name: String,
    var professors: List<String> = listOf(),
)

