package com.example.demo.missionimage;

import com.example.demo.mission.Mission;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "mission_images")
public class MissionImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;

    @Column(name = "mission_id", insertable = false, updatable = false)
    private Long missionId;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    @JsonBackReference
    private Mission mission;

    public MissionImage(Long id, String imageUrl, Mission mission) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.mission = mission;
    }

    public MissionImage() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }
}
