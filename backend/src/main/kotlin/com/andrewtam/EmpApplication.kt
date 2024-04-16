package com.andrewtam

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.convert.MappingMongoConverter
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper
import jakarta.annotation.PostConstruct

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class EmpApplication 
fun main(args: Array<String>) {
	runApplication<EmpApplication>(*args)
}


@Configuration
class AppConfiguration {
    @Autowired
    private val mongoConverter: MappingMongoConverter? = null

    // remove _class
    @PostConstruct
    fun setupMongoEscapeCharacterConversion() {
        mongoConverter!!.setTypeMapper(DefaultMongoTypeMapper(null))
    }
}