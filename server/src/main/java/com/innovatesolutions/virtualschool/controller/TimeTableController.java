package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.TimeTable;
import com.innovatesolutions.virtualschool.service.TimeTableService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("api/v1/timetables")
@AllArgsConstructor
public class TimeTableController {

    private final TimeTableService timeTableService;

    //Get all timeTables
    @GetMapping
    public List<TimeTable> fetchAllTimeTables(){
        return timeTableService.getAllTimeTables();
    }

    //Get all timeTablesBy classId
    @GetMapping("/{classId}")
    public List<TimeTable> getTimeTablesByClassId(@PathVariable String classId){
        return timeTableService.getTimeTablesByClassId(classId);
    }

    //Get timetables by classId and Row number
    @GetMapping("/{classId}/{rowNo}")
    public List<TimeTable> getTimeTablesByClassIdAndRowNo(@PathVariable String classId, @PathVariable int rowNo) {
        return timeTableService.getTimeTablesByClassIdAndRowNo(classId, rowNo);
    }

    //Add new timetable
    @PostMapping
    public String addTimeTable(@RequestBody TimeTable timeTable) {
        TimeTable newTimeTable = timeTableService.addTimeTable(timeTable);
        return "Timetable added";

    }

    //Update timetable by class and Row number
    @PutMapping("/{classId}/{rowNo}")
    public ResponseEntity<TimeTable> updateTimeTableByClassIdAndRowNo(
            @PathVariable String classId,
            @PathVariable int rowNo,
            @RequestBody TimeTable updatedTimeTable) {
        TimeTable editedTimeTable = timeTableService.editTimeTableByClassIdAndRowNo(classId, rowNo, updatedTimeTable);
        if (editedTimeTable != null) {
            return new ResponseEntity<>(editedTimeTable, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Delete timetable by class and Row number
    @DeleteMapping("/{classId}/{rowNo}")
    public ResponseEntity<String> deleteTimeTableByClassIdAndRowNo(
            @PathVariable String classId,
            @PathVariable int rowNo) {
        try {
            timeTableService.deleteTimeTableByClassIdAndRowNo(classId, rowNo);
            return new ResponseEntity<>("Timetable deleted", HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>("Failed to delete timetable", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
