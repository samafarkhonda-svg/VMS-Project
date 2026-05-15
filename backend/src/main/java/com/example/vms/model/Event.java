package com.example.vms.model;

// This class represents the events table in the database.
// Each object of this class is one event from the database.

public class Event 
{
    private Integer eventId;
    private String eventName;
    private String description;
    private String eventDate;
    private String location;
    private Integer userId;
    private String image;
    private String eventTime;

    public Integer getEventId() 
    {
        return eventId;
    }

    public void setEventId(Integer eventId) 
    {
        this.eventId = eventId;
    }

    public String getEventName() 
    {
        return eventName;
    }

    public void setEventName(String eventName) 
    {
        this.eventName = eventName;
    }

    public String getDescription() 
    {
        return description;
    }

    public void setDescription(String description) 
    {
        this.description = description;
    }

    public String getEventDate() 
    {
        return eventDate;
    }

    public void setEventDate(String eventDate) 
    {
        this.eventDate = eventDate;
    }

    public String getLocation() 
    {
        return location;
    }

    public void setLocation(String location) 
    {
        this.location = location;
    }

    public Integer getUserId() 
    {
        return userId;
    }

    public void setUserId(Integer userId) 
    {
        this.userId = userId;
    }

    public String getImage() 
    {
        return image;
    }

    public void setImage(String image) 
    {
        this.image = image;
    }

    public String getEventTime()
    {
        return eventTime;
    }

    public void setEventTime(String eventTime)
    {
        this.eventTime = eventTime;
    }
}