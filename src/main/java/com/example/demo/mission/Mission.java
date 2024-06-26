package com.example.demo.mission;

import com.example.demo.drone.Drone;
import com.example.demo.missionimage.MissionImage;
import com.example.demo.missionpoint.MissionPoint;
import com.example.demo.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "mission")
public class Mission {
    @Id
    @SequenceGenerator(
            name = "mission_sequence",
            sequenceName = "mission_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "mission_sequence"
    )
    private Long id;
    private String title;
    private String description;
    private Type type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MissionPoint> missionPoints;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MissionImage> missionImages;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "drone_id", nullable = false)
    private Drone drone;

    // Constructors, getters and setters
    public Mission() {}

    public Mission(Long id, String title, String description, Type type, LocalDateTime startDate, LocalDateTime endDate, User user, Drone drone, List<MissionPoint> missionPoints, List<MissionImage> missionImages) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.drone = drone;
        this.missionPoints = missionPoints;
        this.missionImages = missionImages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Drone getDrone() {
        return drone;
    }

    public void setDrone(Drone drone) {
        this.drone = drone;
    }

    public List<MissionPoint> getMissionPoints() {
        return missionPoints;
    }

    public void setMissionPoints(List<MissionPoint> missionPoints) {
        this.missionPoints = missionPoints;
    }

    public List<MissionImage> getMissionImages() {
        return missionImages;
    }

    public void setMissionImages(List<MissionImage> missionImages) {
        this.missionImages = missionImages;
    }
}
