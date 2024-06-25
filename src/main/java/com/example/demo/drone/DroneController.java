package com.example.demo.drone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/drone")
public class DroneController {
    private final DroneService droneService;

    @Autowired
    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }

    // REQUESTS
    // GET
    @GetMapping
    public List<Drone> getDrones() {
        return droneService.getDrones();
    }

    // GET SINGLE DRONE BY ID
    @GetMapping("/{droneId}")
    public Optional<Drone> getDroneById(@PathVariable("droneId") Long droneId) {
        return droneService.getDroneById(droneId);
    }

    // POST
    @PostMapping
    public void createNewDrone(@RequestBody Drone drone) {
        droneService.addNewDrone(drone);
    }

    // DELETE
    @DeleteMapping(path = "{id}")
    public void deleteDrone(@PathVariable("id") Long id) {
        droneService.deleteDrone(id);
    }

    // PUT
    @PutMapping(path = "{id}")
    public void updateDrone(
            @PathVariable("id") Long droneId,
            @RequestBody Drone updatedDrone
    ) {
        droneService.updateDrone(droneId, updatedDrone.getName(), updatedDrone.getMaxSpeed(), updatedDrone.getRange(), updatedDrone.getImageSrc());
    }
}
