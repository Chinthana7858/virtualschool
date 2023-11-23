package com.innovatesolutions.virtualschool.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Document
public class Feedback {
    @Id
    private String feedbackId;
    private String studentId;
    private String teacherId;
    private String subjectId;
    private String classId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime dateTime;
    private String body;
    public Feedback(){}
    public Feedback(
            String feedbackId,
            String studentId,
            String teacherId,
            String subjectId,
            String classId,
            LocalDateTime dateTime,
            String body){
        this.feedbackId=feedbackId;
        this.studentId=studentId;
        this.teacherId=teacherId;
        this.subjectId=subjectId;
        this.classId=classId;
        this.dateTime=dateTime;
        this.body=body;
    }
}
