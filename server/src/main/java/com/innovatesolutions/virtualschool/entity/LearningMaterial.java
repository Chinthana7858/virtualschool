package com.innovatesolutions.virtualschool.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LearningMaterial that = (LearningMaterial) o;
        return Objects.equals(materialId, that.materialId) &&
                Objects.equals(materialName, that.materialName) &&
                Objects.equals(topicId, that.topicId)&&
                Objects.equals(date,that.date)&&
                Objects.equals(materialLink,that.materialLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(materialId, materialName, topicId, date, materialLink);
    }
}
