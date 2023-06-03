package com.innovatesolutions.virtualschool.entity;

import com.innovatesolutions.virtualschool.enums.AttendanceEnum;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Document
public class Attendance {
    @Id
    private String id;
    private String classId;
    private String studentId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;
    private AttendanceEnum state;

    public Attendance(){}
    public Attendance(String id,
                      String classId,
                      String studentId,
                      LocalDate date,
                      AttendanceEnum state
    ){
        this.id=id;
        this.classId=classId;
        this.studentId=studentId;
        this.date=date;
        this.state=state;
    }
}
