package com.example.vms.controller;

import com.example.vms.service.EmailService;
import com.example.vms.model.Registration;
import com.example.vms.repository.RegistrationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5179"
})

@RestController
@RequestMapping("/api")

public class RegistrationController {

    private final RegistrationRepository registrationRepository;


    public RegistrationController(
            RegistrationRepository registrationRepository,
            EmailService emailService
    ) {

        this.registrationRepository =
                registrationRepository;

    }

    @PostMapping("/register")
    public String register(
            @RequestBody Registration registration
    ) {

        boolean alreadyRegistered =
                registrationRepository.existsByUserNameAndEventId(
                        registration.getUserName(),
                        registration.getEventId()
                );

        if (alreadyRegistered) {
            return "User already registered";
        }

        registrationRepository.save(registration);

        // SEND EMAIL
        
        return "Registered successfully";
    }

    @DeleteMapping("/register/{eventId}")
    public String unregister(
            @PathVariable int eventId,
            @RequestParam String userName
    ) {

        registrationRepository.deleteByUserNameAndEventId(
                userName,
                eventId
        );

        return "Unregistered successfully";
    }

    @GetMapping("/register/user/{username}")
    public List<Registration> getUserRegistrations(
            @PathVariable String username
    ) {

        return registrationRepository.findByUserName(username);
    }
}