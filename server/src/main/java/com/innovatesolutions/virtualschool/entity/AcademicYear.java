package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class AcademicYear {
    @Id
    private  String id;

    private String year;

    private String sectionId;
    AcademicYear(){}

    public AcademicYear(String year, String sectionId){
        this.year=year;
        this.sectionId=sectionId;
    }

}
