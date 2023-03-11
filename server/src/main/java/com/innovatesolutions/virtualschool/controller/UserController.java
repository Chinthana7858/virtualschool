package com.innovatesolutions.virtualschool.controller;
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
@RequestMapping
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    //Get all users
    @GetMapping("api/vi/users")
    public List<User> fetchAllUsers(){
        return userService.getAllUsers();
    }

    //Get users by userid
     @GetMapping("api/vi/users/{userid}")
    public Optional<User> getUserById(@PathVariable String userid) {
        return userService.getUserById(userid);
    }

    //Get users by userRole
    @GetMapping("api/vi/users/role/{userRole}")
    public List<User> getUserByRole(@PathVariable UserRole userRole) {
        return userService.getUsersByRole(userRole);
    }

    //Get users by userRole and userState
  @GetMapping("api/vi/users/role/{userRole}/state/{userState}")
    public List<User> getUserByRoleAndState(@PathVariable UserRole userRole, @PathVariable String userState) {
        return userService.getUsersByRoleAndState(userRole, userState);
    }

    //Save users
    @PostMapping("api/vi/users")
    public String RegisterNewUser(@RequestBody User user){
        userService.addNewUser(user);
        return "Profile created";
    }

    //Delete users by userid
    @DeleteMapping("api/vi/users/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable String userid) {
        if (userService.deleteUser(userid)) {
            return new ResponseEntity<>("User with userid " + userid + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    //Update user by userid
    @PutMapping("api/vi/users/{userid}")
    public ResponseEntity<String> updateUser(@PathVariable("userid") String userid, @RequestBody User user){
        if(userService.updateUser(userid,user)){
            return new ResponseEntity<>("User with userid " + userid + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }

    }

    //Update userStateTo1 by userid
    @PutMapping("api/vi/users/userStateTo1/{userid}")
    public ResponseEntity<String> updateUserStateTo1(@PathVariable("userid") String userid){
        if(userService.updateUserStateTo1(userid)){
            return new ResponseEntity<>("UserState with userid " + userid + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }

    }

    //Update userStateTo2 by userid
    @PutMapping("api/vi/users/userStateTo2/{userid}")
    public ResponseEntity<String> updateUserStateTo2(@PathVariable("userid") String userid){
        if(userService.updateUserStateTo2(userid)){
            return new ResponseEntity<>("UserState with userid " + userid + " has been updated.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }

    }



}
