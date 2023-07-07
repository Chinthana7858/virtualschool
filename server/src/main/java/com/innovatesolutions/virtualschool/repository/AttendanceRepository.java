package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance,String > {
    Optional<Attendance> findByClassIdAndStudentIdAndDate(String classId, String studentId, LocalDate date);

    Optional<Attendance> findByDateAndStudentId(LocalDate date, String studentId);

    Attendance save(Attendance attendance);

}
