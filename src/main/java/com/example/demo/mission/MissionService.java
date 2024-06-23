package com.example.demo.mission;

import com.example.demo.missionpoint.MissionPointRepository;
import com.example.demo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MissionService {
    private final MissionRepository missionRepository;
    private final MissionPointRepository missionPointRepository;

    @Autowired
    public MissionService(MissionRepository missionRepository, MissionPointRepository missionPointRepository) {
        this.missionRepository = missionRepository;
        this.missionPointRepository = missionPointRepository;
    }

    public List<Mission> getMissions(Optional<User> user) {
        if (user.isPresent()) {
            return missionRepository.findMissionsByUser(user.get());
        } else {
            return missionRepository.findAll();
        }
    }

    public void addNewMission(Mission mission) {
        missionRepository.save(mission);

        // RETRIEVING MISSION POINTS FROM MISSION OBJECT AND FILLING mission_points TABLE WITH THESE POINTS
        mission.getMissionPoints().forEach(point -> {
            // CONNECTING THIS MISSION TO POINT
            point.setMission(mission);
            missionPointRepository.save(point);
        });


        System.out.println("Mission added!\n" + mission);
    }
}
