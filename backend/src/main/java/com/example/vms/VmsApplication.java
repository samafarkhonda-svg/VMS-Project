package com.example.vms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This is the main file of the backend application.
// It starts the Spring Boot server and loads all components (controller, repository, etc.)

@SpringBootApplication
public class VmsApplication {

    // This method runs when the backend starts
    public static void main(String[] args) {

        // Starts the Spring Boot application
        SpringApplication.run(VmsApplication.class, args);
    }
}