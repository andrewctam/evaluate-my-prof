package com.andrewtam

import org.springframework.data.mongodb.repository.MongoRepository

interface SchoolRepo : MongoRepository<School, String> {
    fun findByName(name: String): School?
}