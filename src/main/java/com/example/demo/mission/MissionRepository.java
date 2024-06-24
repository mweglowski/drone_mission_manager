package com.example.demo.mission;

import com.example.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MissionRepository extends JpaRepository<Mission, User> {
    List<Mission> findMissionsByUser(User user);

    Mission findById(Long id);
}
