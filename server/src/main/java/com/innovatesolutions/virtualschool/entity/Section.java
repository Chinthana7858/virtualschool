package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Section {
    @Id
    private String sectionId;
    private String sectionName;
    private String sectionHeadId;

    public Section() {}

    public Section(String sectionId, String sectionName,String sectionHeadId) {
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.sectionHeadId=sectionHeadId;
    }
}
