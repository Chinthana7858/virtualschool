package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.AssignmentSubmission;
import com.innovatesolutions.virtualschool.service.AssignmentSubmissionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/assignmentSubmit")
@AllArgsConstructor
public class AssignmentSubmissionController {
    private final AssignmentSubmissionService assignmentSubmissionService;

    @PostMapping("/{assignmentId}/{studentId}")
    public ResponseEntity<AssignmentSubmission> createAssignment(
            @PathVariable String assignmentId,
            @PathVariable String studentId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("submissionBody") String submissionBody,
            @RequestParam("submissionDate") LocalDateTime submissionDate)
    {
        AssignmentSubmission assignmentSubmission = new AssignmentSubmission();
        assignmentSubmission.setAssignmentId(assignmentId);
        assignmentSubmission.setStudentId(studentId);
        assignmentSubmission.setSubmissionBody(submissionBody);
        assignmentSubmission.setSubmissionDate(submissionDate);

        try {
            String submissionId = assignmentSubmissionService.createAssignmentSubmission(file, assignmentSubmission);
            return ResponseEntity.ok(assignmentSubmission);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return an appropriate response for duplicate submissions
        }
    }


    @GetMapping("/assignment/{assignmentId}")
    public List<AssignmentSubmission> getSubmissionsByAssignmentId(@PathVariable String assignmentId) {
        return assignmentSubmissionService.getSubmissionsByAssignmentId(assignmentId);
    }

    @GetMapping("/student/{studentId}")
    public List<AssignmentSubmission> getSubmissionsByStudentId(@PathVariable String studentId) {
        return assignmentSubmissionService.getSubmissionsByStudentId(studentId);
    }

    @GetMapping("/{submissionId}")
    public AssignmentSubmission getAssignmentSubmissionBySubmissionId(@PathVariable String submissionId) {
        return assignmentSubmissionService.getAssignmentSubmissionBySubmissionId(submissionId);
    }

    @PostMapping("/{submissionId}/grade")
    public ResponseEntity<String> updateGradeBySubmissionId(
            @PathVariable String submissionId,
            @RequestBody Map<String, String> requestBody) {
        String newGrade = requestBody.get("newGrade");
        try {
            assignmentSubmissionService.updateGradeBySubmissionId(submissionId, newGrade);
            return ResponseEntity.ok("Grade updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Submission not found");
        }
    }

    @DeleteMapping("/{submissionId}")
    public ResponseEntity<String> deleteSubmission(@PathVariable String submissionId) {
        assignmentSubmissionService.deleteSubmissionById(submissionId);
        return ResponseEntity.status(HttpStatus.OK).body("Assignment submission deleted successfully");
    }

}
