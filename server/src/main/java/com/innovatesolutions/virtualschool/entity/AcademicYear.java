package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Document
public class AcademicYear {
    @Id
    private  String id;
    @Min(value = 1000, message = "Year must be greater than or equal to 1000")
    @Max(value = 9999, message = "Year must be less than or equal to 9999")
    private Integer year;
    private String sectionId;
    AcademicYear(){}

    public AcademicYear(Integer year, String sectionId){
        this.year=year;
        this.sectionId=sectionId;
    }

}
