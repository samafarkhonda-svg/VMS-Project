package com.example.vms.config;

// These imports are added through Maven dependencies
// allow us to configure how the backend behaves
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// This annotation tells Spring that this file is a configuration class
// It will be automatically loaded when the backend starts
@Configuration
public class CorsConfig {

    // This method creates a configuration object (bean)
    // Spring will use it to customize web behavior
    @Bean
    public WebMvcConfigurer corsConfigurer() {

        // We return a WebMvcConfigurer object to override default settings
        return new WebMvcConfigurer() {

            // This method is used to define CORS rules
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Apply CORS rules to all API routes starting with /api/
                registry.addMapping("/api/**")

                        // Allow requests from React frontend (running on port 5173)
                        .allowedOrigins("http://localhost:5173")

                        // Allow these HTTP methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        // Allow cookies/session (important for login/logout)
                        .allowCredentials(true);
            }
        };
    }
}