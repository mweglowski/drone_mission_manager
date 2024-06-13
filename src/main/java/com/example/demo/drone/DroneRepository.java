package com.example.demo.drone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DroneRepository extends JpaRepository<Drone, Long> {

//    @Query("SELECT d FROM Drone d WHERE d.name = ?1")
    Optional<Drone> findDroneByName(String name);
}
