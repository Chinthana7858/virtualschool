package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.innovatesolutions.virtualschool.repository.LoginResponse;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        User user1 = new User(
                user.getUserid(),
                user.getUserState(),
                user.getUserRole(),
                null,
                user.getFullName(),
                user.getPhoneNo(),
                
                user.getDateOfBirth(),
                user.getEmail(),
                user.getNIC(),
                null,
                user.getAddress(),
                null,
                this.passwordEncoder.encode(user.getpassword()),
                user.getstUserid() 
        );

        userRepository.save(user1);
    }
    public Optional<User> getUserById(String userid) {
        return userRepository.findById(userid);
    }

    public List<User> getUsersByRole(UserRole userRole) {
        return userRepository.findByUserRole(userRole);
    }

    public List<User> getUsersByRoleAndState(UserRole userRole, String userState) {
        return userRepository.findByUserRoleAndUserState(userRole, userState);
    }
    public boolean deleteUser(String userid) {
        try {
            userRepository.deleteByUserid(userid);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

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

    public LoginResponse  loginUser(User user) {
        String msg = "";
        User user1 = userRepository.findByUseremail(user.getEmail());
        if (user1 != null) {
            String password = user1.getpassword();
            String encodedPassword = user1.getpassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            UserRole urole = user1.getUserRole();
            String role = urole.toString();
            
            if (isPwdRight) {
                
                if (user1.getUserState()=="approved" || role=="ADMIN") {
                    return new LoginResponse("Login Success", true,role);
                } else {
                    return new LoginResponse("Your registration request not approved yet", false,role);
                }
            } else {
 
                return new LoginResponse("password Not Match", false,role);
            }
        }else {
            return new LoginResponse("Email not exits", false, "");
        }
 
 
    }
}

