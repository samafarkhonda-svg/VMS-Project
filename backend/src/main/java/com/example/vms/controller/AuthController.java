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
import com.example.vms.service.EmailService;
import com.example.vms.service.EmailServiceURL;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

// This annotation tells Spring that this class handles HTTP requests (API endpoints)
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5179"
})
@RestController

// Base URL for all routes in this controller
@RequestMapping("/api/auth")
public class AuthController {

    // This connects the controller to the database layer
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final EmailServiceURL emailServiceURL;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository, EmailService emailService, EmailServiceURL emailServiceURL) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.emailServiceURL = emailServiceURL;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) {

        //check that fields aren't empty
        if (user.getFirstName() == null || user.getFirstName().isBlank() ||
            user.getLastName() == null || user.getLastName().isBlank() ||
            user.getUsername() == null || user.getUsername().isBlank() ||
            user.getEmail() == null || user.getEmail().isBlank() ||
            user.getPassword() == null || user.getPassword().isBlank()) {

            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "All fields are required."));
        }

        //check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(false, "Email already in use."));
        }

        //check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(false, "Username already in use."));
        }

        //send verification code to their email
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        emailService.sendVerificationCode(user.getEmail(), user.getFirstName());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(true, "Account created successfully."));
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verify(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String code = request.get("code");

        if (email == null || code == null) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Email and code are required."));
        }

        boolean isValid = emailService.verifyCode(email, code);

        if (isValid) {
            return ResponseEntity.ok(new AuthResponse(true, "Email verified successfully."));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Invalid or expired code."));
        }
    }


    // Sends email to user when resetting password
    @PostMapping("/resetPasswordEmail")
    public ResponseEntity<AuthResponse> resetPasswordEmail(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Email required."));
        }

        emailServiceURL.sendVerificationURL(email);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(true, "Email sent successfully."));
    }

    // Compares tokens when user is resetting password
    @PostMapping("/checkTokenPWReset")
    public ResponseEntity<AuthResponse> checkTokenPWReset(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String token = request.get("token");

        if (email == null) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Email required."));
        }
        if (token == null) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Token (from URL) required."));
        }
        
        boolean match = emailServiceURL.compareTokens(email, token);

        if (match) {
            return ResponseEntity.ok(new AuthResponse(true, "Tokens match."));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Tokens don't match."));
        }
    }

    // changes the user's password when resetting it
    @PostMapping("/setNewPassword")
    public ResponseEntity<AuthResponse> setNewPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        userRepository.updatePassword(email, passwordEncoder.encode(password)); // encode password before storing it

        if (password == null || email == null) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, "Email required."));
        }
        else {
            return ResponseEntity.ok(new AuthResponse(true, "Tokens match."));
        }

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
        // Compare entered password with the hashed password stored in the database
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
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

        // Send verification code to their email
        emailService.sendVerificationCode(user.getEmail(), user.getFirstName());

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
    
    // Checks if user is logged in by checking session userId
    private boolean isLoggedIn(HttpSession session) {
        return session.getAttribute("userId") != null;
    }

    // Authorization check route
    @GetMapping("/check-auth")
    public ResponseEntity<AuthResponse> checkAuth(HttpSession session) {
        if (!isLoggedIn(session)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "User is not logged in."));
        }

        return ResponseEntity.ok(new AuthResponse(true, "User is logged in."));
    }

    // protected route for account/profile access
    @GetMapping("/account")
    public ResponseEntity<AuthResponse> getAccount(HttpSession session) {
        if (!isLoggedIn(session)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "You must log in first."));
        }

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", session.getAttribute("userId"));
        userInfo.put("username", session.getAttribute("username"));

        return ResponseEntity.ok(new AuthResponse(true, "Authorized user.", userInfo));
    }
}
