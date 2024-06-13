package com.example.demo.drone;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/drone")
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

    // POST
    @PostMapping
    public void createNewDrone(@RequestBody Drone drone) {
        droneService.addNewDrone(drone);
    }

    // DELETE
    @DeleteMapping(path = "{droneId}")
    public void deleteDrone(@PathVariable("droneId") Long droneId) {
        droneService.deleteDrone(droneId);
    }

    // PUT
    @PutMapping(path = "{droneId}")
    public void updateDrone(@PathVariable("droneId") Long droneId, @RequestParam(required = false) String name, @RequestParam(required = false) Double maxSpeed, @RequestParam(required = false) Double range) {
        droneService.updateDrone(droneId, name, maxSpeed, range);
    }
}
