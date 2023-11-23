package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.Assignment;
import com.innovatesolutions.virtualschool.enums.BucketName;
import com.innovatesolutions.virtualschool.fileStore.FileStore;
import com.innovatesolutions.virtualschool.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AssignmentService {
    private final AssignmentRepository repository;
    private final FileStore fileStore;

    @Autowired
    public AssignmentService(AssignmentRepository repository, FileStore fileStore) {
        this.repository = repository;
        this.fileStore = fileStore;
    }


    public String createAssignment(MultipartFile file, Assignment assignment) {
        // 1. Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file");
        }

        // 2. Store material in MongoDB
        String assignmentId = UUID.randomUUID().toString();
        assignment.setAssignmentId(assignmentId);
        repository.save(assignment);

        // 3. Store the file in S3 and update material link in MongoDB
        String path = String.format("%s/%s", BucketName.ASSIGNMENTS.getBucketName(), assignmentId);
        String fileName = file.getOriginalFilename();

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            fileStore.save(path, fileName, Optional.of(metadata), inputStream);
            assignment.setDocLink(fileStore.getUrl(path, fileName));
            repository.save(assignment);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store file to S3", e);
        }

        return assignmentId;
    }

    public List<Assignment> getAssignmentsBySubjectId(String subjectId) {
        return repository.findBySubjectId(subjectId);
    }

    public Assignment getAssignmentById(String assignmentId) {
        return repository.findByAssignmentId(assignmentId);
    }

    public void deleteAssignmentById(String assignmentId) {
        repository.deleteByAssignmentId(assignmentId);
    }

    public void updateDueDateByAssignmentId(String assignmentId, LocalDateTime newDueDate) {
        Assignment assignment = repository.findByAssignmentId(assignmentId);
        if (assignment != null) {
            assignment.setDueDate(newDueDate);
            repository.save(assignment);
        } else {
            throw new IllegalArgumentException("Assignment not found");
        }
    }

}
