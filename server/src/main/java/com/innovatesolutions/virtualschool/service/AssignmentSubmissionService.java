package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.AssignmentSubmission;
import com.innovatesolutions.virtualschool.enums.BucketName;
import com.innovatesolutions.virtualschool.fileStore.FileStore;
import com.innovatesolutions.virtualschool.repository.AssignmentSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;


@Service
public class AssignmentSubmissionService {
    private final AssignmentSubmissionRepository repository;
    private final FileStore fileStore;

    @Autowired
    public AssignmentSubmissionService(AssignmentSubmissionRepository repository, FileStore fileStore) {
        this.repository = repository;
        this.fileStore = fileStore;
    }

    public String createAssignmentSubmission(MultipartFile file, AssignmentSubmission assignmentSubmission) {
        String assignmentId = assignmentSubmission.getAssignmentId();
        String studentId = assignmentSubmission.getStudentId();

        // Check for duplicate submissions
        if (repository.existsByAssignmentIdAndStudentId(assignmentId, studentId)) {
            throw new IllegalStateException("Duplicate submission detected");
        }
        // 1. Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file");
        }

        // 2. Store material in MongoDB
        String submissionId = UUID.randomUUID().toString();
        assignmentSubmission.setSubmissionId(submissionId);
        repository.save(assignmentSubmission);

        // 3. Store the file in S3 and update material link in MongoDB
        String path = String.format("%s/%s", BucketName.ASSIGNMENTS.getBucketName(), submissionId);
        String fileName = file.getOriginalFilename();

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            fileStore.save(path, fileName, Optional.of(metadata), inputStream);
            assignmentSubmission.setSubmissionDocLink(fileStore.getUrl(path, fileName));
            repository.save(assignmentSubmission);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store file to S3", e);
        }

        return submissionId;
    }

    public List<AssignmentSubmission> getSubmissionsByAssignmentId(String assignmentId) {
        return repository.findByAssignmentId(assignmentId);
    }

    public List<AssignmentSubmission> getSubmissionsByStudentId(String studentId) {
        return repository.findByStudentId(studentId);
    }

    public AssignmentSubmission getAssignmentSubmissionBySubmissionId(String submissionId) {
        return repository.findBySubmissionId(submissionId);
    }

    public void updateGradeBySubmissionId(String submissionId, String newGrade) {
        AssignmentSubmission submission = repository.findBySubmissionId(submissionId);
        if (submission != null) {
            submission.setGrade(newGrade);
            repository.save(submission);
        } else {
            throw new IllegalArgumentException("Submission not found");
        }
    }

    public void deleteSubmissionById(String submissionId) {
        repository.deleteById(submissionId);
    }

}
