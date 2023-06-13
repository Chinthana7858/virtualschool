package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Document
public class Topic {
    @Id
    private String topicId;
    private String topicName;
    private String subjectId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime date;

    public Topic() {}

    public Topic(String topicId,String topicName, String subjectId, LocalDateTime date) {
        this.topicId=topicId;
        this.topicName=topicName;
        this.subjectId=subjectId;
        this.date=date;
    }
}
