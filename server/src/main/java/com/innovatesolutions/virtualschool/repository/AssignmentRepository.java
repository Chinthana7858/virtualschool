package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends MongoRepository<Assignment,String> {
    List<Assignment> findBySubjectId(String subjectId);
    Assignment findByAssignmentId(String assignmentId);
    void deleteByAssignmentId(String assignmentId);
}
