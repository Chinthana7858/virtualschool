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
@RequestMapping
@AllArgsConstructor
public class TimeTableController {

    private final TimeTableService timeTableService;

    //Get all timeTables
    @GetMapping("api/vi/timetables")
    public List<TimeTable> fetchAllTimeTables(){
        return timeTableService.getAllTimeTables();
    }

    //Get all timeTablesBy classId
    @GetMapping("api/vi/timetables/{classId}")
    public List<TimeTable> getTimeTablesByClassId(@PathVariable String classId){
        return timeTableService.getTimeTablesByClassId(classId);
    }

    @GetMapping("api/vi/timetables/{classId}/{rowNo}")
    public List<TimeTable> getTimeTablesByClassIdAndRowNo(@PathVariable String classId, @PathVariable int rowNo) {
        return timeTableService.getTimeTablesByClassIdAndRowNo(classId, rowNo);
    }

    @PostMapping("api/vi/timetables")
    public String addTimeTable(@RequestBody TimeTable timeTable) {
        TimeTable newTimeTable = timeTableService.addTimeTable(timeTable);
        return "Timetable added";

    }

    @PutMapping("api/vi/timetables/{classId}/{rowNo}")
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

    @DeleteMapping("api/vi/timetables/{classId}/{rowNo}")
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
