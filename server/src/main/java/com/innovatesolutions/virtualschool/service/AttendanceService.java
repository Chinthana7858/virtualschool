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
        Optional<Attendance> existingAttendance = attendanceRepository
                .findByClassIdAndStudentIdAndDate(
                        attendance.getClassId(),
                        attendance.getStudentId(),
                        attendance.getDate()
                );
        if (existingAttendance.isPresent()) {
            Attendance currentAttendance = existingAttendance.get();
            currentAttendance.setState(attendance.getState());
            return attendanceRepository.save(currentAttendance);
        } else {
            return attendanceRepository.save(attendance);
        }
    }

    public Optional<Attendance> getAttendance(String classId, String studentId, LocalDate date) {
        return attendanceRepository.findByClassIdAndStudentIdAndDate(classId, studentId, date);
    }

    public Optional<Attendance> getAttendanceByDateAndUserId(LocalDate date, String userId) {
        return attendanceRepository.findByDateAndStudentId(date, userId);
    }


}
