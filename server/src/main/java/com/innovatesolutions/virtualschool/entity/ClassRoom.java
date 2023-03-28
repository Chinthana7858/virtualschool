package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class ClassRoom {
    @Id
    private  String id;
    private String classRoomId;
    private String sectionId;
    private String teacherInChargeId;
    private Integer academicYear;

    public ClassRoom() {}

    public ClassRoom(String classRoomId, String sectionId, String teacherInChargeId , Integer academicYear) {
        this.classRoomId=classRoomId;
        this.sectionId = sectionId;
        this.teacherInChargeId = teacherInChargeId;
        this.academicYear=academicYear;
    }
}
