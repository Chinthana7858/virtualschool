package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.service.UserService;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("api/vi/users")
    public List<User> fetchAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("api/vi/users")
    public String RegisterNewUser(@RequestBody User user){
        userService.addNewUser(user);
        return "Profile created";
    }

    @DeleteMapping("api/vi/users/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable String userid) {
        if (userService.deleteUser(userid)) {
            return new ResponseEntity<>("User with userid " + userid + " has been deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User with userid " + userid + " not found.", HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("api/vi/users/{userid}")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        try {
            userService.updateUser(user);
            return new ResponseEntity<>("User with userid " + user.getUserid() + " has been updated.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("User with userid " + user.getUserid() + " not found. and exeption is"+ e.getMessage()+" and passed user "+user, HttpStatus.NOT_FOUND);
        }
    }


}
