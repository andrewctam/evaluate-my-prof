package com.andrewtam

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestParam

@SpringBootApplication
@RestController
class EmpApplication {
    @GetMapping("/")
    fun hello(@RequestParam(value = "name", defaultValue = "World") name: String?): String {
        return String.format("Hello %s!", name)
    }
}

fun main(args: Array<String>) {
	runApplication<EmpApplication>(*args)
}
