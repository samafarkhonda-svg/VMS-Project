package com.example.vms.controller;

// These imports are needed for handling requests, responses, and session management
import com.example.vms.dto.AuthResponse;
import com.example.vms.dto.LoginRequest;
import com.example.vms.model.User;
import com.example.vms.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// This annotation tells Spring that this class handles HTTP requests (API endpoints)
@RestController

// Base URL for all routes in this controller
@RequestMapping("/api/auth")
public class AuthController {

    // This connects the controller to the database layer
    private final UserRepository userRepository;

    // Constructor injection (Spring automatically provides UserRepository)
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // This method handles login requests from the frontend
    // It listens to POST requests at /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpSession session) {

        // Check if user left fields empty
        if (request.getIdentifier() == null || request.getIdentifier().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {

            // Return error if missing input
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Identifier and password are required."));
        }

        // Search for user in database using username OR email
        User user = userRepository.findByIdentifier(request.getIdentifier());

        // If user does not exist
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "User not found."));
        }

        // Check if password matches 
        // Note: This should be replaced with hashing later for security
        if (!request.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Invalid password."));
        }

        // Save user info in session (keeps user logged in)
        session.setAttribute("userId", user.getUserId());
        session.setAttribute("username", user.getUsername());

        // Create safe user object (do NOT send password to frontend)
        Map<String, Object> safeUser = new HashMap<>();
        safeUser.put("userId", user.getUserId());
        safeUser.put("firstName", user.getFirstName());
        safeUser.put("lastName", user.getLastName());
        safeUser.put("username", user.getUsername());
        safeUser.put("email", user.getEmail());

        // Return success response to frontend
        return ResponseEntity.ok(new AuthResponse(true, "Login successful.", safeUser));
    }

    // This method handles logout requests
    // It listens to POST requests at /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpSession session) {

        // Destroy the session (logs user out)
        session.invalidate();

        // Return success message
        return ResponseEntity.ok(new AuthResponse(true, "Logged out successfully."));
    }
}