package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addNewUser(User user) {

        userRepository.save(user);
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



}

