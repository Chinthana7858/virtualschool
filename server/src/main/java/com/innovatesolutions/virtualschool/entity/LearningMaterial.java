package com.innovatesolutions.virtualschool.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
public class LearningMaterial {
    @Id
    private String materialId;
    private String materialName;
    private String topicId;
    private String date;
    private String materialLink;

    public LearningMaterial(){}

    public LearningMaterial(String materialId,
                            String materialName,
                            String topicId,
                            String date,
                            String materialLink){
        this.materialId=materialId;
        this.materialName=materialName;
        this.topicId=topicId;
        this.date=date;
        this.materialLink=materialLink;
    }


}
