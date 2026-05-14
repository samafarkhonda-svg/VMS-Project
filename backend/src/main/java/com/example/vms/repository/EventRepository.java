package com.example.vms.repository;

import com.example.vms.model.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

// This class connects the backend to the database.
// It is used to run SQL queries on the events and event_registrations tables.
@Repository
public class EventRepository 
{
    private final JdbcTemplate jdbcTemplate;

    public EventRepository(JdbcTemplate jdbcTemplate) 
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Get all events from the database
    public List<Event> findAllEvents() 
    {
        String sql = "SELECT event_id, event_name, description, event_date, location, user_id, image " +
             "FROM events";
        
        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> mapRowToEvent(rs)
        );
    }

    // Get a specific event by ID
    public Event findById(int eventId) 
    {
        String sql = "SELECT event_id, event_name, description, event_date, location, user_id, image " +
                     "FROM events WHERE event_id = ?";
        
        List<Event> events = jdbcTemplate.query(
            sql,
            (rs, rowNum) -> mapRowToEvent(rs),
            eventId
        );
        
        return events.isEmpty() ? null : events.get(0);
    }

    // Register a user for an event
    public int registerUserForEvent(int eventId, int userId) 
    {
        String sql = "INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)";
        
        try 
        {
            return jdbcTemplate.update(sql, eventId, userId);
        } 
        catch (Exception e) 
        {
            // Handle duplicate registration
            return 0;
        }
    }

    // Get all events a user is registered for
    public List<Integer> getRegisteredEventIds(int userId) 
    {
        String sql = "SELECT event_id FROM event_registrations WHERE user_id = ?";
        
        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> rs.getInt("event_id"),
            userId
        );
    }

    // Get all events a user is registered for (with full event details)
    public List<Event> getRegisteredEvents(int userId) 
    {
        String sql = "SELECT e.event_id, e.event_name, e.description, e.event_date, e.location, e.user_id " +
                     "FROM events e " +
                     "INNER JOIN event_registrations er ON e.event_id = er.event_id " +
                     "WHERE er.user_id = ?";
        
        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> mapRowToEvent(rs),
            userId
        );
    }

    // Check if a user is already registered for an event
    public boolean isUserRegistered(int eventId, int userId) 
    {
        String sql = "SELECT COUNT(*) FROM event_registrations WHERE event_id = ? AND user_id = ?";
        
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, eventId, userId);
        return count != null && count > 0;
    }

    // Helper method to map database row to Event object
    private Event mapRowToEvent(java.sql.ResultSet rs) throws java.sql.SQLException 
    {
        Event event = new Event();
        event.setEventId(rs.getInt("event_id"));
        event.setEventName(rs.getString("event_name"));
        event.setDescription(rs.getString("description"));
        event.setEventDate(rs.getString("event_date"));
        event.setLocation(rs.getString("location"));
        event.setUserId(rs.getInt("user_id"));
        event.setImage(rs.getString("image"));
        return event;
    }
    public void unregisterUserFromEvent(int eventId, int userId) 
    {
    String sql = "DELETE FROM event_registrations WHERE event_id = ? AND user_id = ?";
    jdbcTemplate.update(sql, eventId, userId);
}
}
