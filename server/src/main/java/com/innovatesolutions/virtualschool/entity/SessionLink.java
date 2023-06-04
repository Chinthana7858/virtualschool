package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Document
public class SessionLink {
    @Id
    private String sessionId;
    private String topicId;
    private LocalDate date;
    private LocalTime startingTime;
    private String link;

    public SessionLink() {}

    public SessionLink(String sessionId, String topicId, LocalDate date, LocalTime startingTime, String link) {
        this.sessionId = sessionId;
        this.topicId = topicId;
        this.date=date;
        this.startingTime=startingTime;
        this.link=link;

    }
}
