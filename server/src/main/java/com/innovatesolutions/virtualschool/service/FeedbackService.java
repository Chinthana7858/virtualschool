package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.Feedback;
import com.innovatesolutions.virtualschool.repository.FeedbackRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FeedbackService {
    @Autowired
    private final FeedbackRepository feedbackRepository;
    public List<Feedback> getFeedbackBySubjectIdAndStudentId(String subjectId, String studentId) {
        return feedbackRepository.findBySubjectIdAndStudentId(subjectId, studentId);
    }

    public List<Feedback> getFeedbackByStudentId(
            String studentId
    ){
        return feedbackRepository.findByStudentId(
                studentId
        );
    }

    public Feedback saveFeedback(
            String studentId,
            String teacherId,
            String classId,
            String subjectId,
            Feedback feedback
    ) {
        feedback.setStudentId(studentId);
        feedback.setTeacherId(teacherId);
        feedback.setClassId(classId);
        feedback.setSubjectId(subjectId);
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedbackById(String feedbackId) {
        feedbackRepository.deleteByFeedbackId(feedbackId);
    }
}
