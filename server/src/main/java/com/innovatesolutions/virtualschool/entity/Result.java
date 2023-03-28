package com.innovatesolutions.virtualschool.entity;
import com.innovatesolutions.virtualschool.enums.Term;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Result {
    @Id
    private String resultId;
    private String subjectId;
    private String classId;
    private String userid;
    private Term term;
    private Float result;

    public Result() {}

    public Result(String resultId,
                  String subjectId,
                  String classId,
                  String userid,
                  Term term,
                  Float result) {
        this.resultId=resultId;
        this.subjectId=subjectId;
        this.classId=classId;
        this.userid = userid;
        this.term = term;
        this.result=result;

    }
}
