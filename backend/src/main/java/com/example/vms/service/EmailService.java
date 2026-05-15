package com.example.vms.service;

import com.example.vms.repository.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    //sends the email
    private final JavaMailSender mailSender;

    //connects to the database so we can save/get the verification code
    private final UserRepository userRepository;

    //constructor
    public EmailService(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    //generates a 6-digit code and sends it to the user's email
    public void sendVerificationCode(String email, String firstName) {

        //generates a random 6-digit number
        String code = String.format("%06d", new Random().nextInt(999999));

        //saves the code to the database
        userRepository.saveVerificationCode(email, code);

        //creates the email for the user
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your VMS Verification Code");
        message.setText("Hi " + firstName + ",\n\nYour verification code is: " + code + "\n\nThis code expires in 10 minutes.");

        //sends the email
        mailSender.send(message);
    }

    //checks if the code the user entered is correct
    public boolean verifyCode(String email, String code) {

        //get the code from db
        String storedCode = userRepository.getVerificationCode(email);

        //checks with user's input
        if (storedCode != null && storedCode.equals(code)) {
            //code was correct
            userRepository.clearVerificationCode(email);
            return true;
        }

        //code was not correct
        return false;
    }
    public void sendEventRegistrationEmail(
        String email,
        String firstName,
        String eventName,
        String location,
        String time
) {

    SimpleMailMessage message =
            new SimpleMailMessage();

    message.setTo(email);

    message.setSubject(
            "Volunteer Event Registration Confirmation"
    );

    message.setText(

            "Hi " + firstName + ",\n\n"

            + "You have successfully registered for:\n\n"

            + "Event: " + eventName + "\n"
            + "Location: " + location + "\n"
            + "Time: " + time + "\n\n"

            + "Thank you for volunteering with VMS!"
    );

    mailSender.send(message);
}
}