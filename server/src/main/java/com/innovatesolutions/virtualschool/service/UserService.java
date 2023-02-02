package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;

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

    public boolean deleteUser(String userid) {
        try {
            userRepository.deleteByUserid(userid);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    public void updateUser(User user) {
        User userToUpdate = userRepository.findByUserid(user.getUserid());
        if (userToUpdate != null) {
            userToUpdate.setUserRole(user.getUserRole());
            userToUpdate.setFirstName(user.getFirstName());
            userToUpdate.setLastName(user.getLastName());
            userToUpdate.setFullName(user.getFullName());
            userToUpdate.setPhoneNo(user.getPhoneNo());
            userToUpdate.setDateOfBirth(user.getDateOfBirth());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setGender(user.getGender());
            userToUpdate.setAddress(user.getAddress());
            userRepository.save(userToUpdate);
        } else {
            throw new IllegalArgumentException("Invalid user Id:" + user.getUserid());
        }

    }




}
