package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.innovatesolutions.virtualschool.repository.LoginResponse;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import lombok.ToString;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
                user.getFullname(),
                user.getPhoneNo(),
                
                user.getdateOfBirth(),
                user.getemail(),
                user.getNIC(),
                null,
                user.getaddress(),
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
            userToUpdate.setFullname(user.getFullname()!=null?user.getFullname():userToUpdate.getFullname());
            userToUpdate.setPhoneNo(user.getPhoneNo()!=null?user.getPhoneNo():userToUpdate.getPhoneNo());
            userToUpdate.setdateOfBirth(user.getdateOfBirth()!=null?user.getdateOfBirth():userToUpdate.getdateOfBirth());
            userToUpdate.setemail(user.getemail()!=null?user.getemail():userToUpdate.getemail());
            userToUpdate.setGender(user.getGender()!=null?user.getGender():userToUpdate.getGender());
            userToUpdate.setaddress(user.getaddress()!=null?user.getaddress():userToUpdate.getaddress());
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

    
    public LoginResponse  loginUser(User user) {
        String msg = "";
        User user1 = userRepository.findByUseremail(user.getemail());
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

