package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    // GET USER BY ID
    @GetMapping
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        Optional<User> user = Optional.ofNullable(userService.getUserById(id));

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET ALL USERS
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {
        Optional<User> user = Optional.ofNullable(userService.updateUser(id, updatedUser));
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // CHANGE USER PASSWORD
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

    // DELETE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
