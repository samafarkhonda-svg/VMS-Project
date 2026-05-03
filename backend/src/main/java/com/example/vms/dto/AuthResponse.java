package com.example.vms.dto;

// This class is used to send response from backend to frontend.
// It tells if the request worked, gives a message, and can include user data.

public class AuthResponse {

    private boolean success;   // true or false (did the request work)
    private String message;    // explanation ( login successful or error)
    private Object user;       // user data sent back (no password)

    public AuthResponse() {}

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponse(boolean success, String message, Object user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Object getUser() { return user; }
    public void setUser(Object user) { this.user = user; }
}