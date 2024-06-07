package com.andrewtam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.andrewtam.MessageResponse
import java.security.SecureRandom


@RestController
@RequestMapping("/schools")
class SchoolController(@Autowired val schoolRepo: SchoolRepo, @Autowired val userRepo: UserRepo) {

    @GetMapping("/getProfessors")
    fun getProfessors(@RequestParam schoolName: String): ResponseEntity<List<String>> {
        val school = schoolRepo.findByName(schoolName)

        if (school == null)
            return ResponseEntity.ok(listOf())

        return ResponseEntity.ok(school.professors)
    }

    @PostMapping("/addProfessor")
    fun addProfessor(@RequestBody body: AddProfessorRequest): ResponseEntity<MessageResponse> {
        val user = userRepo.findByUsername(body.username)

        if (user == null) {
            return ResponseEntity.badRequest().body(MessageResponse("User not found"))
        }
        if (!verifySessionToken(user, body.sessionToken)) {
            return ResponseEntity.badRequest().body(MessageResponse("Invalid session token"))
        }

        // potential edge case?
        if (body.profName == "Add New Professor")
            return ResponseEntity.badRequest().body(MessageResponse("Invalid professor name"))

        var school = schoolRepo.findByName(body.schoolName)

        // if the school doesn't exist, create it
        if (school == null) {
            school = School(name = body.schoolName)
        }

        school.professors += body.profName

        schoolRepo.save(school)
        return ResponseEntity.ok(MessageResponse("Professor added to school"))
    }

}
