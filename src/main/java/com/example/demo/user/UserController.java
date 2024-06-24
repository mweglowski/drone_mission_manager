package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        Optional<User> user = Optional.ofNullable(userService.getUserById(id));

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, Object> payload) {
        // EXTRACTING PROPERTIES
        Long id = ((Number) payload.get("id")).longValue();
        String currentPassword = (String) payload.get("currentPassword");
        String newPassword = (String) payload.get("newPassword");

        // GET THE USER
        Optional<User> user = Optional.ofNullable(userService.getUserById(id));

        if (user.isPresent()) {
            boolean isPasswordChanged = userService.changePassword(user.get(), currentPassword, newPassword);

            if (isPasswordChanged) {
                return ResponseEntity.ok("Password changed successfully.");
            } else {
                return ResponseEntity.badRequest().body("Current password is incorrect.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
