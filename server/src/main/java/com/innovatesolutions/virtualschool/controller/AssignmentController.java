package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.Assignment;
import com.innovatesolutions.virtualschool.service.AssignmentService;
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
@RequestMapping("api/v1/assignment")
@AllArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @PostMapping("/{classId}/{subjectId}/{topicId}")
    public ResponseEntity<Assignment> createAssignment(
            @PathVariable String classId,
            @PathVariable String subjectId,
            @PathVariable String topicId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("assignmentHead") String assignmentHead,
            @RequestParam("assignmentBody") String assignmentBody,
            @RequestParam("dueDate") LocalDateTime dueDate)
    {
        Assignment assignment=new Assignment();
        assignment.setAssignmentHead(assignmentHead);
        assignment.setAssignmentBody(assignmentBody);
        assignment.setDueDate(dueDate);
        assignment.setClassId(classId);
        assignment.setSubjectId(subjectId);
        assignment.setTopicId(topicId);
        String assignmentId = assignmentService.createAssignment(file, assignment);
        return ResponseEntity.ok(assignment);
    }

    @GetMapping("/subjects/{subjectId}")
    public ResponseEntity<List<Assignment>> getAssignmentsBySubjectId(@PathVariable String subjectId) {
        List<Assignment> assignments = assignmentService.getAssignmentsBySubjectId(subjectId);
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    @GetMapping("/{assignmentId}")
    public Assignment getAssignmentById(@PathVariable String assignmentId) {
        return assignmentService.getAssignmentById(assignmentId);
    }

    @DeleteMapping("/{assignmentId}")
    public void deleteAssignmentById(@PathVariable String assignmentId) {
        assignmentService.deleteAssignmentById(assignmentId);
    }

    @PostMapping("/{assignmentId}/dueDate")
    public ResponseEntity<String> updateDueDateByAssignmentId(
            @PathVariable String assignmentId,
            @RequestBody Map<String, LocalDateTime> requestBody) {
        LocalDateTime newDueDate = requestBody.get("newDueDate");
        try {
            assignmentService.updateDueDateByAssignmentId(assignmentId, newDueDate);
            return ResponseEntity.ok("Due date updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assignment not found");
        }
    }

}
