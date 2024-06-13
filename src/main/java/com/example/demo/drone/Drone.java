package com.example.demo.drone;

import jakarta.persistence.*;

@Entity
@Table
public class Drone {
    @Id
    @SequenceGenerator(
            name = "drone_sequence",
            sequenceName = "drone_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "drone_sequence"
    )
    private Long id;
    private String name;
    private Double maxSpeed; // m/s
    private Double range; // km

    public Drone() {}

    public Drone(Long id, String name, Double maxSpeed, Double range) {
        this.id = id;
        this.name = name;
        this.maxSpeed = maxSpeed;
        this.range = range;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(Double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public Double getRange() {
        return range;
    }

    public void setRange(Double range) {
        this.range = range;
    }

    @Override
    public String toString() {
        return "Drone{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", maxSpeed=" + maxSpeed +
                ", range=" + range +
                '}';
    }
}
