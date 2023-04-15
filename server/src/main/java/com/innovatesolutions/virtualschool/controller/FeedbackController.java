package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.Feedback;
import com.innovatesolutions.virtualschool.service.FeedbackService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/feedback")
@AllArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;
    @GetMapping("/Subject/{subjectId}")
    public List<Feedback> getFeedbackBySubjectId(
            @PathVariable String subjectId
    ) {
        return feedbackService.getFeedbackBySubjectId(
                subjectId
        );
    }

    @GetMapping("/Student/{studentId}")
    public List<Feedback>getFeedbackByStudentId(
            @PathVariable String studentId
    ){
        return feedbackService.getFeedbackByStudentId(
                studentId
        );
    }

    @PostMapping("/{studentId}/{teacherId}/{classId}/{subjectId}")
    public Feedback saveFeedback(
            @PathVariable String studentId,
            @PathVariable String teacherId,
            @PathVariable String classId,
            @PathVariable String subjectId,
            @RequestBody Feedback feedback
    ) {
        feedback.setStudentId(studentId);
        feedback.setTeacherId(teacherId);
        feedback.setClassId(classId);
        feedback.setSubjectId(subjectId);
        return feedbackService.saveFeedback(studentId,teacherId, classId, subjectId,feedback);
    }
}
