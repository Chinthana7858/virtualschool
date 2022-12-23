package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository
        extends MongoRepository <Student,String>{
}
