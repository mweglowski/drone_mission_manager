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

            Drone phantom = new Drone(null, "DJI Phantom 4 Pro", 20.0, 7.0, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dkfuaARKRg_A3huzN5OUUZXH8aSA32jY9Q&s");
            Drone parrot = new Drone(null, "Parrot Anafi", 15.0, 4.0, "https://sklep.pomiarydronem.pl/2748-large_default/parrot-anafi-usa-kompaktowy-dron-z-termowizja-i-zoomem.jpg");
            Drone evo = new Drone(null, "Autel Robotics EVO II", 18.0, 9.0, "https://pl.autelpilot.eu/cdn/shop/products/autel-drone-evo-lite-plus-orange-4_1024x1024.jpg?v=1657778850");

            repository.saveAll(List.of(phantom, parrot, evo));
        };
    }
}
