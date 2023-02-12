package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.enums.userRole;
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

    public List<User> getUsersByRole(userRole userRole) {
        return userRepository.findByUserRole(userRole);
    }

    public List<User> getUsersByRoleAndState(userRole userRole, String userState) {
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
            userToUpdate.setUserRole(user.getUserRole());
            userToUpdate.setUserState(user.getUserState());
            userToUpdate.setFullName(user.getFullName());
            userToUpdate.setPhoneNo(user.getPhoneNo());
            userToUpdate.setDateOfBirth(user.getDateOfBirth());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setGender(user.getGender());
            userToUpdate.setAddress(user.getAddress());
            userRepository.save(userToUpdate);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid user Id:" + userid);
        }
    }

    public boolean updateUserState(String userid) {
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


}

