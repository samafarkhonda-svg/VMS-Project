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
        String sql = "SELECT user_id, first_name, last_name, username, email, password, photo, phone, " +
                     "birth_date, address, city, state, zip, bio " +
                     "FROM users " +
                     "WHERE email = ? OR username = ? " +
                     "LIMIT 1";

        // Run query and map result to User object
        List<User> users = jdbcTemplate.query(
            sql,
            (rs, rowNum) -> mapRowToUser(rs),
            identifier, identifier
        );

        // Return first user if found, otherwise null
        return users.isEmpty() ? null : users.get(0);
    }

    // Save verification code for a user
    public void saveVerificationCode(String email, String code) {
        String sql = "UPDATE users SET verification_code = ? WHERE email = ?";
        jdbcTemplate.update(sql, code, email);
    }

    // Save token for a user
    public void saveResetToken(String email, String token) {
        String sql = "UPDATE users SET reset_token = ? WHERE email = ?";
        jdbcTemplate.update(sql, token, email);
    }

    public void updatePassword(String email, String password) {
        String sql = "UPDATE users SET password = ? WHERE email = ?";
        jdbcTemplate.update(sql, password, email);
    }

    // Get verification code for a user
    public String getVerificationCode(String email) {
        String sql = "SELECT verification_code FROM users WHERE email = ?";
        List<String> results = jdbcTemplate.query(
            sql,
            (rs, rowNum) -> rs.getString("verification_code"),
            email
        );
        return results.isEmpty() ? null : results.get(0);
    }

    // Get token for a user
    public String getResetToken(String email) {
        String sql = "SELECT reset_token FROM users WHERE email = ?";
        List<String> results = jdbcTemplate.query(
            sql,
            (rs, rowNum) -> rs.getString("reset_token"),
            email
        );
        return results.isEmpty() ? null : results.get(0);
    }

    // Clear verification code after successful verification
    public void clearVerificationCode(String email) {
        String sql = "UPDATE users SET verification_code = NULL WHERE email = ?";
        jdbcTemplate.update(sql, email);
    }

    // Insert new user into database
    public void save(User user) {
        String sql = "INSERT INTO users (first_name, last_name, username, email, password) " +
                    "VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate.update(
            sql,
            user.getFirstName(),
            user.getLastName(),
            user.getUsername(),
            user.getEmail(),
            user.getPassword()
        );
    }

    //reusable method to map a database row to a User object
    private User mapRowToUser(java.sql.ResultSet rs) throws java.sql.SQLException {
        User user = new User();
        user.setUserId(rs.getInt("user_id"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setUsername(rs.getString("username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setPhoto(rs.getString("photo"));
        user.setPhone(rs.getString("phone"));
        user.setBirthDate(rs.getString("birth_date"));
        user.setAddress(rs.getString("address"));
        user.setCity(rs.getString("city"));
        user.setState(rs.getString("state"));
        user.setZip(rs.getString("zip"));
        user.setBio(rs.getString("bio"));
        return user;
    }

    //find user by ID
    public User findById(Integer userId) {
        String sql = "SELECT user_id, first_name, last_name, username, email, password, photo, phone, " +
                    "birth_date, address, city, state, zip, bio " +
                    "FROM users WHERE user_id = ?";

        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> mapRowToUser(rs), userId);
        return users.isEmpty() ? null : users.get(0);
    }

    //update user profile
    public void updateProfile(User user) {
        String sql = "UPDATE users SET first_name = ?, last_name = ?, phone = ?, " +
                    "birth_date = ?, address = ?, city = ?, state = ?, zip = ?, bio = ? " +
                    "WHERE user_id = ?";

        jdbcTemplate.update(sql,
            user.getFirstName(),
            user.getLastName(),
            user.getPhone(),
            user.getBirthDate(),
            user.getAddress(),
            user.getCity(),
            user.getState(),
            user.getZip(),
            user.getBio(),
            user.getUserId()
        );
    }

    //find user by email
    public User findByEmail(String email) {
        String sql = "SELECT user_id, first_name, last_name, username, email, password, photo, phone, " +
                    "birth_date, address, city, state, zip, bio " +
                    "FROM users WHERE email = ? LIMIT 1";

        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> mapRowToUser(rs), email);
        return users.isEmpty() ? null : users.get(0);
    }

    //find user by username
    public User findByUsername(String username) {
        String sql = "SELECT user_id, first_name, last_name, username, email, password, photo, phone, " +
                    "birth_date, address, city, state, zip, bio " +
                    "FROM users WHERE username = ? LIMIT 1";

        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> mapRowToUser(rs), username);
        return users.isEmpty() ? null : users.get(0);
    }
}
