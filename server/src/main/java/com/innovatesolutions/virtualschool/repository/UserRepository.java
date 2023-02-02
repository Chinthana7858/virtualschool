package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User, String> {
    void deleteByUserid(String userid);

    User findByUserid(String userid);


}

