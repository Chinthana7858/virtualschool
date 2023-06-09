package com.innovatesolutions.virtualschool.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Data
@Document
public class AssignmentSubmission {
    @Id
    private String submissionId;
    private String assignmentId;
    private String studentId;
    private String submissionBody;
    private LocalDateTime submissionDate;
    private String grade;
    private String submissionDocLink;


    public AssignmentSubmission(){}
    public AssignmentSubmission(
                      String submissionId,
                      String assignmentId,
                      String studentId,
                      String submissionBody,
                      LocalDateTime submissionDate,
                      String grade,
                      String submissionDocLink
    ){
        this.submissionId=submissionId;
        this.assignmentId=assignmentId;
        this.studentId=studentId;
        this.submissionBody=submissionBody;
        this.submissionDate=submissionDate;
        this.grade=grade;
        this.submissionDocLink=submissionDocLink;
    }
}
