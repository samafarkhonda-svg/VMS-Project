package com.example.vms.service;

import com.example.vms.repository.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

// This is intentionally very similar to EmailService.java but is used to generate and verify a url with a unique token appended.
// Used when resetting the user's password.

@Service
public class EmailServiceURL {

    //sends the email
    private final JavaMailSender mailSender;

    //connects to the database so we can save/get the verification code
    private final UserRepository userRepository;

    //constructor
    public EmailServiceURL(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    //generates a token to be appended to the URL 
    public void sendVerificationURL(String email, String firstName) {

        //generates a token
        String token = UUID.randomUUID().toString();

        //saves the code to the database
        userRepository.saveVerificationToken(email, token);

        String url = "http://localhost:5173/forgot-password-entry/" + token;

        //creates the email for the user
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("VMS Password Reset Request");
        message.setText("Hi " + firstName + ",\n\nA password reset attempt was recently initialized for your VMS account.\n\nIf you requested for your password to be reset, please click the link below to choose a new password: \n\n" + url + "\n\nThis link expires in 10 minutes.\n\nIf you did not initialize this password reset attempt, just ignore this email.");

        //sends the email
        mailSender.send(message);
    }
    
}
