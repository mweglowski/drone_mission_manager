package com.example.demo.missionpoint;

import com.example.demo.mission.Mission;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "mission_points")
public class MissionPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double lat;
    private double lng;
    private int pointOrder;

    @Column(name = "mission_id", insertable = false, updatable = false)
    private Long missionId;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    @JsonBackReference
    private Mission mission;

    public MissionPoint(Long id, double lat, double lng, int pointOrder, Mission mission) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.pointOrder = pointOrder;
        this.mission = mission;
    }

    public MissionPoint() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public int getPointOrder() {
        return pointOrder;
    }

    public void setPointOrder(int pointOrder) {
        this.pointOrder = pointOrder;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }
}
