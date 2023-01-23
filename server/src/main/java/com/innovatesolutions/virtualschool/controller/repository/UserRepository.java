package com.innovatesolutions.virtualschool.controller.repository;
import com.innovatesolutions.virtualschool.controller.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    void deleteByUserid(String userid);
}

