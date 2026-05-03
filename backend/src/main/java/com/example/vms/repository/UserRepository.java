package com.example.vms.repository;

import com.example.vms.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

// This class connects the backend to the database.
// It is used to run SQL queries on the users table.
@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate; // used to execute SQL queries

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // This method finds a user using email OR username
    public User findByIdentifier(String identifier) {

        // SQL query to search user in database
        String sql = "SELECT user_id, first_name, last_name, username, email, password, photo " +
                     "FROM users " +
                     "WHERE email = ? OR username = ? " +
                     "LIMIT 1";

        // Run query and map result to User object
        List<User> users = jdbcTemplate.query(
            sql,
            (rs, rowNum) -> {
                User user = new User();
                user.setUserId(rs.getInt("user_id"));
                user.setFirstName(rs.getString("first_name"));
                user.setLastName(rs.getString("last_name"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                return user;
            },
            identifier, identifier
        );

        // Return first user if found, otherwise null
        return users.isEmpty() ? null : users.get(0);
    }
}