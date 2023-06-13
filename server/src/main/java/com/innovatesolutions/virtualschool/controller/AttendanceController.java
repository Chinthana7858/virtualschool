package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.Attendance;
import com.innovatesolutions.virtualschool.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/attendance")
@AllArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/{classId}/{studentId}/{date}")
    public Attendance saveAttendance(@PathVariable String classId,
                                     @PathVariable String studentId,
                                     @PathVariable LocalDate date,
                                     @RequestBody Attendance attendance) {
        attendance.setClassId(classId);
        attendance.setStudentId(studentId);
        attendance.setDate(date);
        return attendanceService.saveAttendance(attendance);
    }


    @GetMapping("/{classId}/{studentId}/{date}")
    public Optional<Attendance> getAttendance(@PathVariable String classId,
                                              @PathVariable String studentId,
                                              @PathVariable LocalDate date) {
        return attendanceService.getAttendance(classId, studentId, date);
    }

    @GetMapping("/{date}/{userId}")
    public ResponseEntity<Optional<Attendance>> getAttendanceByDateAndUserId(
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @PathVariable("userId") String userId
    ) {
        Optional<Attendance> attendanceList = attendanceService.getAttendanceByDateAndUserId(date, userId);
        return new ResponseEntity<>(attendanceList, HttpStatus.OK);
    }

}
