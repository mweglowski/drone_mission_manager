package com.example.demo.mission;

import com.example.demo.user.User;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/mission")
public class MissionController {
    private final MissionService missionService;
    private final UserService userService;

    @Autowired
    public MissionController(MissionService missionService, UserService userService) {
        this.missionService = missionService;
        this.userService = userService;
    }

    // GET
    @GetMapping
    public List<Mission> getMissions(@RequestParam Optional<Long> userId) {
        Optional<User> user = Optional.empty();
        if (userId.isPresent()) {
            user = Optional.of(userService.getUserById(userId.get()));
        }
        return missionService.getMissions(user);
    }

    // POST
    @PostMapping
    public void createNewMission(@RequestBody Mission mission) {
        missionService.addNewMission(mission);
    }
}
