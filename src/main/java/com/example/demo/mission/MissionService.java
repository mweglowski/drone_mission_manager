package com.example.demo.mission;

import com.example.demo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MissionService {
    private final MissionRepository missionRepository;

    @Autowired
    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
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

        System.out.println("Mission added!\n" + mission);
    }
}
