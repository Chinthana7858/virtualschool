package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Subject {
    @Id
    private String subjectId;
    private String classRoomId;
    private String subjectName;
    private String teacherId;

    public Subject() {}

    public Subject(String subjectId,String classRoomId, String sectionName, String teacherId ) {
        this.subjectId=subjectId;
        this.classRoomId = classRoomId;
        this.subjectName = sectionName;
        this.teacherId=teacherId;
    }
}
