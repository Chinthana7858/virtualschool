package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.Attendance;
import com.innovatesolutions.virtualschool.repository.AttendanceRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AttendanceService {
    @Autowired
    private final AttendanceRepository attendanceRepository;

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Optional<Attendance> getAttendance(String classId, String studentId, LocalDate date) {
        return attendanceRepository.findByClassIdAndStudentIdAndDate(classId, studentId, date);
    }
}
