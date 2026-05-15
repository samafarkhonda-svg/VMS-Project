package com.example.vms.repository;

import com.example.vms.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

    List<Registration> findByUserName(String userName);

    boolean existsByUserNameAndEventId(String userName, int eventId);

    void deleteByUserNameAndEventId(String userName, int eventId);
}