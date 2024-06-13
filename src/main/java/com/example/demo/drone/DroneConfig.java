package com.example.demo.drone;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DroneConfig {

    @Bean
    CommandLineRunner commandLineRunner(DroneRepository repository) {
        return args -> {
            Drone phantom = new Drone(1L, "DJI Phantom 4 Pro", 20.0, 7.0);
            Drone parrot = new Drone(2L, "Parrot Anafi", 15.0, 4.0);
            Drone evo = new Drone(3L, "Autel Robotics EVO II", 18.0, 9.0);

            repository.saveAll(List.of(phantom, parrot, evo));
        };
    }
}
