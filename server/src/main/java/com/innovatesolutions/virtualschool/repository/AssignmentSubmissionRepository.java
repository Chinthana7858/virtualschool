package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.AssignmentSubmission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentSubmissionRepository extends MongoRepository<AssignmentSubmission,String> {
    List<AssignmentSubmission> findByAssignmentId(String assignmentId);
    List<AssignmentSubmission> findByStudentId(String studentId);
    AssignmentSubmission findBySubmissionId(String submissionId);
    boolean existsByAssignmentIdAndStudentId(String assignmentId, String studentId);

}
