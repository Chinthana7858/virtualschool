package com.innovatesolutions.virtualschool.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document
public class Assignment {
    @Id
    private String assignmentId;
    private String classId;
    private String subjectId;
    private String topicId;
    private String assignmentHead;
    private String assignmentBody;
    private String materialId;
    private LocalDateTime dueDate;
    private String docLink;


    public Assignment(){}
    public Assignment(String assignmentId,
                      String classId,
                      String subjectId,
                      String topicId,
                      String assignmentHead,
                      String assignmentBody,
                      String materialId,
                      LocalDateTime dueDate,
                      String docLink
    ){
        this.assignmentId=assignmentId;
        this.classId=classId;
        this.subjectId=subjectId;
        this.topicId=topicId;
        this.assignmentHead=assignmentHead;
        this.assignmentBody=assignmentBody;
        this.materialId=materialId;
        this.dueDate=dueDate;
        this.docLink=docLink;
    }
}
