package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;


@Data
@Document
public class DiscussionForum {
    @Id
    private String id;
    private String discussionTopic;
    private String classId;
    private String subjectId;
    private String userid;
    private String message;
    private String motherDiscussionId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime dateTime;

    public DiscussionForum(){}
    public DiscussionForum(
            String id,
            String discussionTopic,
            String classId,
            String subjectId,
            String userid,
            String message,
            String motherDiscussionId,
            LocalDateTime dateTime)
    {
        this.id=id;
        this.discussionTopic=discussionTopic;
        this.classId=classId;
        this.subjectId=subjectId;
        this.userid=userid;
        this.message=message;
        this.motherDiscussionId=motherDiscussionId;
        this.dateTime=dateTime;
    }


}
