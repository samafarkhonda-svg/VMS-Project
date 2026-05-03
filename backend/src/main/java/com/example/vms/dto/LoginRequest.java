package com.example.vms.dto;

// This class receives login data from the frontend.
// It stores what the user types (username/email and password).

public class LoginRequest {

    private String identifier; // username or email
    private String password;   // user password

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}