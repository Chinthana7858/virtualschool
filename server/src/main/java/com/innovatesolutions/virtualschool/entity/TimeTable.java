package com.innovatesolutions.virtualschool.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@CompoundIndex(def = "{'classId': 1, 'rowNo': 1}", unique = true)
public class TimeTable {
    @Id
    private String id;
    private String classId;
    private int rowNo;
    private String timePeriod;
    private String MondaySubject;
    private String TuesdaySubject;
    private String WednesdaySubject;
    private String ThursdaySubject;
    private String FridaySubject;

    public TimeTable() {
    }
    public TimeTable(String classId,
                     int rowNo,
                     String timePeriod,
                     String MondaySubject,
                     String TuesdaySubject,
                     String WednesdaySubject,
                     String ThursdaySubject,
                     String FridaySubject)
    {
        this.classId = classId;
        this.rowNo = rowNo;
        this.timePeriod = timePeriod;
        this.MondaySubject=MondaySubject;
        this.TuesdaySubject=TuesdaySubject;
        this.WednesdaySubject=WednesdaySubject;
        this.ThursdaySubject=ThursdaySubject;
        this.FridaySubject=FridaySubject;


    }
}
