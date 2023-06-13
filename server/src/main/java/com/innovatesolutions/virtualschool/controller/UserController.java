package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.LoginResponse;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.innovatesolutions.virtualschool.service.UserService;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    //Get all users
    @GetMapping
    public List<User> fetchAllUsers() {
        return userService.getAllUsers();
    }

    //Get users by userid
    @GetMapping("/{userid}")
    public Optional<User> getUserById(@PathVariable String userid) {
        return userService.getUserById(userid);
    }

    //Get users by userRole
    @GetMapping("/role/{userRole}")
    public List<User> getUserByRole(@PathVariable UserRole userRole) {
        return userService.getUsersByRole(userRole);
    }

    //Get users by userRole and userState
    @GetMapping("/role/{userRole}/state/{userState}")
    public List<User> getUserByRoleAndState(@PathVariable UserRole userRole, @PathVariable String userState) {
        return userService.getUsersByRoleAndState(userRole, userState);
    }

    //Save users
    @PostMapping("/save")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    //login users
    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        LoginResponse loginResponse = userService.login(user);
        return loginResponse;
    }

    //Delete users by userid
    @DeleteMapping("/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable String userid) {
        if (userService.deleteUser(userid)) {
            return new ResponseEntity<>("User with userid " + userid + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }
    }


    //Update user by userid
    @PutMapping("/{userid}/contactDetails")
    public ResponseEntity<User> updateUserContactDetails(
            @PathVariable("userid") String userid,
            @RequestParam("email") String email,
            @RequestParam("address") String address
    ) {
        User updatedUser = userService.updateUserContactDetails(userid, email, address);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    //User states: 0 - Request pending user/ 1 - Request approved user/ 2 - Removed user
    //
    //Update user state to 1 (Request approve)
    @PutMapping("/userStateTo1/{userid}")
    public ResponseEntity<String> updateUserStateTo1(@PathVariable("userid") String userid) {
        if (userService.updateUserStateTo1(userid)) {
            return new ResponseEntity<>("UserState with userid " + userid + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }

    }

    //Update user state to 2 (User remove)
    @PutMapping("/userStateTo2/{userid}")
    public ResponseEntity<String> updateUserStateTo2(@PathVariable("userid") String userid) {
        if (userService.updateUserStateTo2(userid)) {
            return new ResponseEntity<>("UserState with userid " + userid + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/{userRole}/{userid}/class/{classId}")
    public ResponseEntity<String> updateClassIds(
            @PathVariable String userRole,
            @PathVariable String userid,
            @PathVariable String classId
    ) {
        try {
            userService.updateClassIds(userid, classId);
            return ResponseEntity.ok("ClassId updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    //Get users by userRole and classId
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<User>> getUsersByClassId(@PathVariable String classId) {
        List<User> users = userService.getUsersByClassId(classId);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{userId}/classes/{classId}")
    public User removeClassId(@PathVariable String userId, @PathVariable String classId) {
        return userService.removeClassId(userId, classId);
    }

    @GetMapping("/{userId}/classIds")
    public List<String> getClassIdsByUserId(@PathVariable String userId) {
        return userService.getClassIdsByUserId(userId);
    }

}
