package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.TimeTable;
import com.innovatesolutions.virtualschool.repository.TimeTableRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TimeTableService {

    @Autowired
    private final TimeTableRepository timeTableRepository;


    //Get timetables by class
    public List<TimeTable> getTimeTablesByClassId(String classId) {
        return timeTableRepository.findByClassId(classId);
    }

    //Get timetables by class and row number
    public List<TimeTable> getTimeTablesByClassIdAndRowNo(String classId, int rowNo) {
        return timeTableRepository.findByClassIdAndRowNo(classId, rowNo);
    }

    //Get all timetables
    public List<TimeTable> getAllTimeTables(){
        return timeTableRepository.findAll();
    }

    //Add new timetable
    public TimeTable addTimeTable(TimeTable timeTable) {
        return timeTableRepository.save(timeTable);
    }

    //Edit timetable details by class and row number
    public TimeTable editTimeTableByClassIdAndRowNo(String classId, int rowNo, TimeTable updatedTimeTable) {
        Optional<TimeTable> existingTimeTableOptional = timeTableRepository.findByClassIdAndRowNo(classId, rowNo).stream().findFirst();
        if (existingTimeTableOptional.isPresent()) {
            TimeTable existingTimeTable = existingTimeTableOptional.get();
            existingTimeTable.setStartingTime(updatedTimeTable.getStartingTime());
            existingTimeTable.setEndingTime(updatedTimeTable.getEndingTime());
            existingTimeTable.setMondaySubject(updatedTimeTable.getMondaySubject());
            existingTimeTable.setTuesdaySubject(updatedTimeTable.getTuesdaySubject());
            existingTimeTable.setWednesdaySubject(updatedTimeTable.getWednesdaySubject());
            existingTimeTable.setThursdaySubject(updatedTimeTable.getThursdaySubject());
            existingTimeTable.setFridaySubject(updatedTimeTable.getFridaySubject());
            return timeTableRepository.save(existingTimeTable);
        } else {
            return null;
        }
    }

    //Delete timetable by class and Row number
    public void deleteTimeTableByClassIdAndRowNo(String classId, int rowNo) {
        Optional<TimeTable> existingTimeTableOptional = timeTableRepository.findByClassIdAndRowNo(classId, rowNo).stream().findFirst();
        if (existingTimeTableOptional.isPresent()) {
            timeTableRepository.delete(existingTimeTableOptional.get());
        } else {

            throw new IllegalArgumentException("Timetable not found for classId " + classId + " and rowNo " + rowNo);
        }
    }




}





