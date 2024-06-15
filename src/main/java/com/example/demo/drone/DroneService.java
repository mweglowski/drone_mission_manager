package com.example.demo.drone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DroneService {

    private final DroneRepository droneRepository;

    @Autowired
    public DroneService(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    public List<Drone> getDrones() {
        return droneRepository.findAll();
    }

    public void addNewDrone(Drone drone) {
        Optional<Drone> droneOptional = droneRepository.findDroneByName(drone.getName());

        // Prevent from adding drone with name already used
        if (droneOptional.isPresent()) {
            throw new IllegalStateException("Name taken");
        }

        droneRepository.save(drone);

        System.out.println("Drone added!\n" + drone);
    }

    @Transactional
    public void updateDrone(Long id, String name, Double maxSpeed, Double range) {
        Drone droneToModify = droneRepository.findById(id).orElseThrow(() -> new IllegalStateException("Drone with id = " + id + " does not exist."));

        if (name != null && !name.isEmpty() && !Objects.equals(name, droneToModify.getName())) {
            Optional<Drone> droneWithSameName = droneRepository.findDroneByName(name);

            if (droneWithSameName.isPresent()) {
                throw new IllegalStateException("Name taken.");
            }

            droneToModify.setName(name);
        }

        if (maxSpeed != null && maxSpeed > 0 && !maxSpeed.equals(droneToModify.getMaxSpeed())) {
            droneToModify.setMaxSpeed(maxSpeed);
        }

        if (range != null && range > 0 && !range.equals(droneToModify.getRange())) {
            droneToModify.setRange(range);
        }
    }

    public void deleteDrone(Long id) {
        boolean droneExists = droneRepository.existsById(id);

        if (!droneExists) {
            throw new IllegalStateException("Drone with id = " + id + " does not exist.");
        }

        droneRepository.deleteById(id);
    }
}
