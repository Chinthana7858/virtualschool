package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.ClassRoom;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    //Get all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //Add new user
    public void addNewUser(User user) {
        userRepository.save(user);
    }
    //Get user bu userid
    public Optional<User> getUserById(String userid) {
        return userRepository.findById(userid);
    }

    //Get user by userRole
    public List<User> getUsersByRole(UserRole userRole) {
        return userRepository.findByUserRole(userRole);
    }

    //Get users by userRole and userState
    public List<User> getUsersByRoleAndState(UserRole userRole, String userState) {
        return userRepository.findByUserRoleAndUserState(userRole, userState);
    }

    //Delete user by userid
    public boolean deleteUser(String userid) {
        try {
            userRepository.deleteByUserid(userid);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    //Update user details
    public boolean updateUser(String userid, User user) {
        List<User> usersToUpdate = userRepository.findByUserid(userid);
        if (!usersToUpdate.isEmpty()) {
            User userToUpdate = usersToUpdate.get(0);
            userToUpdate.setUserRole(user.getUserRole()!=null?user.getUserRole():userToUpdate.getUserRole());
            userToUpdate.setUserState(user.getUserState()!=null?user.getUserState():userToUpdate.getUserState());
            userToUpdate.setFullName(user.getFullName()!=null?user.getFullName():userToUpdate.getFullName());
            userToUpdate.setPhoneNo(user.getPhoneNo()!=null?user.getPhoneNo():userToUpdate.getPhoneNo());
            userToUpdate.setDateOfBirth(user.getDateOfBirth()!=null?user.getDateOfBirth():userToUpdate.getDateOfBirth());
            userToUpdate.setEmail(user.getEmail()!=null?user.getEmail():userToUpdate.getEmail());
            userToUpdate.setGender(user.getGender()!=null?user.getGender():userToUpdate.getGender());
            userToUpdate.setAddress(user.getAddress()!=null?user.getAddress():userToUpdate.getAddress());
            userRepository.save(userToUpdate);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid user Id:" + userid);
        }
    }

    //User states: 0 - Request pending user/ 1 - Request approved user/ 2 - Removed user
    //
    //Update user state to 1 (Request approve)
    public boolean updateUserStateTo1(String userid) {
        List<User> usersToUpdate = userRepository.findByUserid(userid);
        if (!usersToUpdate.isEmpty()) {
            User userToUpdate = usersToUpdate.get(0);

            userToUpdate.setUserState("1");
            userRepository.save(userToUpdate);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid user Id:" + userid);
        }
    }

    //Update user state to 2 (User remove)
    public boolean updateUserStateTo2(String userid) {
        List<User> usersToUpdate = userRepository.findByUserid(userid);
        if (!usersToUpdate.isEmpty()) {
            User userToUpdate = usersToUpdate.get(0);

            userToUpdate.setUserState("2");
            userRepository.save(userToUpdate);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid user Id:" + userid);
        }
    }

    public void updateClassIds(String userid, String classId) throws Exception {
        List<User> userList = userRepository.findByUserid(userid);
        if (!userList.isEmpty()) {
            User user = userList.get(0);
            List<String> classIds = user.getClassIds();
            if (classIds == null) {
                classIds = new ArrayList<>();
            }
            // Check if the classId already exists in the list
            if (!classIds.contains(classId)) {
                classIds.add(classId);
                user.setClassIds(classIds);
                userRepository.save(user);
            }
        } else {
            throw new Exception("User not found.");
        }
    }


    public List<User> getUsersByClassId(String classId) {
        return userRepository.findByClassIds(classId);
    }

    public User removeClassId(String userId, String classId) {
        List<User> users = userRepository.findByUserid(userId);
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        User user = users.get(0);
        List<String> classIds = user.getClassIds();
        if (!classIds.contains(classId)) {
            throw new ResourceNotFoundException("ClassId not found for user: " + userId);
        }

        classIds.remove(classId);
        user.setClassIds(classIds);
        userRepository.save(user);

        return user;
    }

    public List<String> getClassIdsByUserId(String userId) {
        User user = userRepository.findClassIdsByUserid(userId);
        if (user != null) {
            return (List<String>) user.getClassIds();
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
}

