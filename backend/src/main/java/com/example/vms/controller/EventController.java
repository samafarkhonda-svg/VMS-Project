package com.example.vms.controller;

import com.example.vms.model.Event;
import com.example.vms.repository.EventRepository;
import com.example.vms.service.EmailService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5179"
})

@RestController
@RequestMapping("/api/events")

public class EventController {

    private final EventRepository eventRepository;

    private final JdbcTemplate jdbcTemplate;

    private final EmailService emailService;

    public EventController(
            EventRepository eventRepository,
            JdbcTemplate jdbcTemplate,
            EmailService emailService
    ) {

        this.eventRepository = eventRepository;

        this.jdbcTemplate = jdbcTemplate;

        this.emailService = emailService;
    }

    // GET ALL EVENTS

    @GetMapping
    public ResponseEntity<?> getAllEvents(
            HttpSession session
    ) {

        Integer userId =
                getUserIdFromSession(session);

        try {

            List<Event> events =
                    eventRepository.findAllEvents();

            List<Integer> registeredIds =
                    (userId != null)
                            ? eventRepository.getRegisteredEventIds(userId)
                            : new ArrayList<>();

            List<Map<String, Object>> eventsWithStatus =
                    new ArrayList<>();

            for (Event event : events) {

                Map<String, Object> eventMap =
                        new HashMap<>();

                eventMap.put(
                        "eventId",
                        event.getEventId()
                );

                eventMap.put(
                        "eventName",
                        event.getEventName()
                );

                eventMap.put(
                        "description",
                        event.getDescription()
                );

                eventMap.put(
                        "eventDate",
                        event.getEventDate()
                );

                eventMap.put(
                        "eventTime",
                        event.getEventTime()
                );

                eventMap.put(
                        "location",
                        event.getLocation()
                );

                eventMap.put(
                        "image",
                        event.getImage()
                );

                eventMap.put(
                        "isRegistered",
                        registeredIds.contains(
                                event.getEventId()
                        )
                );

                eventsWithStatus.add(eventMap);
            }

            return ResponseEntity.ok(
                    eventsWithStatus
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Error fetching events: "
                                            + e.getMessage()
                            )
                    );
        }
    }

    // REGISTER EVENT

    @PostMapping("/register")
    public ResponseEntity<?> registerForEvent(
            @RequestBody Map<String, Integer> request,
            HttpSession session
    ) {

        Integer eventId = request.get("eventId");

        Integer userId =
                getUserIdFromSession(session);

        if (userId == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    "User is not authenticated."
                            )
                    );
        }

        try {

            if (
                    eventRepository.isUserRegistered(
                            eventId,
                            userId
                    )
            ) {

                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(
                                Map.of(
                                        "message",
                                        "Already registered"
                                )
                        );
            }

            int result =
                    eventRepository.registerUserForEvent(
                            eventId,
                            userId
                    );

            if (result > 0) {

               Event event =
        eventRepository.findById(eventId);

emailService.sendEventRegistrationEmail(
        "samafarkhonda@gmail.com",
        "Volunteer",
        event.getEventName(),
        event.getLocation(),
        event.getEventTime()
);

                return ResponseEntity.ok(
                        Map.of(
                                "message",
                                "Successfully registered"
                        )
                );

            } else {

                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(
                                Map.of(
                                        "message",
                                        "Failed to register"
                                )
                        );
            }

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Error: " + e.getMessage()
                            )
                    );
        }
    }

    // UNREGISTER EVENT

    @DeleteMapping("/register/{eventId}")
    public ResponseEntity<?> unregisterFromEvent(
            @PathVariable int eventId,
            HttpSession session
    ) {

        Integer userId =
                getUserIdFromSession(session);

        if (userId == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    "User is not authenticated."
                            )
                    );
        }

        try {

            String sql =
                    "DELETE FROM event_registrations WHERE event_id = ? AND user_id = ?";

            int result =
                    jdbcTemplate.update(
                            sql,
                            eventId,
                            userId
                    );

            if (result > 0) {

                return ResponseEntity.ok(
                        Map.of(
                                "message",
                                "Successfully unregistered"
                        )
                );

            } else {

                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(
                                Map.of(
                                        "message",
                                        "Not registered for this event"
                                )
                        );
            }

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Error: " + e.getMessage()
                            )
                    );
        }
    }

    // GET SINGLE EVENT

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(
            @PathVariable int eventId,
            HttpSession session
    ) {

        Integer userId =
                getUserIdFromSession(session);

        try {

            Event event =
                    eventRepository.findById(eventId);

            if (event == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "Event not found."
                                )
                        );
            }

            boolean isRegistered =
                    userId != null &&
                    eventRepository.isUserRegistered(
                            eventId,
                            userId
                    );

            Map<String, Object> eventWithStatus =
                    new HashMap<>();

            eventWithStatus.put(
                    "eventId",
                    event.getEventId()
            );

            eventWithStatus.put(
                    "eventName",
                    event.getEventName()
            );

            eventWithStatus.put(
                    "description",
                    event.getDescription()
            );

            eventWithStatus.put(
                    "eventDate",
                    event.getEventDate()
            );

            eventWithStatus.put(
                    "eventTime",
                    event.getEventTime()
            );

            eventWithStatus.put(
                    "location",
                    event.getLocation()
            );

            eventWithStatus.put(
                    "image",
                    event.getImage()
            );

            eventWithStatus.put(
                    "isRegistered",
                    isRegistered
            );

            return ResponseEntity.ok(
                    eventWithStatus
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Error fetching event: "
                                            + e.getMessage()
                            )
                    );
        }
    }

    // HELPER METHOD

    private Integer getUserIdFromSession(
            HttpSession session
    ) {

        Object userId =
                session.getAttribute("userId");

        return userId instanceof Integer
                ? (Integer) userId
                : null;
    }
}