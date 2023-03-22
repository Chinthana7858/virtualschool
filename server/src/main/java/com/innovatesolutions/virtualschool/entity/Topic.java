package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Topic {
    @Id
    private String topicId;
    private String topicName;
    private String subjectId;
    private String date;

    public Topic() {}

    public Topic(String topicId,String topicName, String subjectId, String date) {
        this.topicId=topicId;
        this.topicName=topicName;
        this.subjectId=subjectId;
        this.date=date;
    }
}
