package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.User;
import com.innovatesolutions.virtualschool.enums.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface UserRepository extends MongoRepository<User, String> {
   void deleteByUserid(String userid);
   List<User> findByUserRole(UserRole userRole);
   List<User> findByUserid(String userid);
   List<User> findByUserRoleAndUserState(UserRole role, String state);
   List<User> findByClassIds(String classId);
   User findClassIdsByUserid(String userid);
   User findByEmail(String email);
}

