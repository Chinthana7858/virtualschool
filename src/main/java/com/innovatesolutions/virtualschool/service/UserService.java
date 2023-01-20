package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.repository.UserRepository;
import com.innovatesolutions.virtualschool.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
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
}
