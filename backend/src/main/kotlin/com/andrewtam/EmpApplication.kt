package com.andrewtam

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
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
    @Bean
    fun addCorsConfig(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                val allowedOrigins = arrayOf("http://localhost:5173", "https://evaluatemyprof.web.app")

                registry.addMapping("/**")
                    .allowedMethods("*")
                    .allowedOriginPatterns(*allowedOrigins)
                    .allowCredentials(true)
            }
        }
    }

    // remove _class
    @PostConstruct
    fun setupMongoEscapeCharacterConversion() {
        mongoConverter!!.setTypeMapper(DefaultMongoTypeMapper(null))
    }
}