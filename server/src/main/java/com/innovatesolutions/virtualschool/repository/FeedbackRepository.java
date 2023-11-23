package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback,String> {
    List<Feedback> findBySubjectIdAndStudentId(String subjectId, String studentId);

    List<Feedback> findByStudentId(
            String studentId
    );

    void deleteByFeedbackId(String feedbackId);
}