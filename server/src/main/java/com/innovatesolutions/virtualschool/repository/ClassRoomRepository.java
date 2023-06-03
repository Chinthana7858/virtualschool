package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.ClassRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRoomRepository extends MongoRepository<ClassRoom,String> {
    ClassRoom findByClassRoomId(String classRoomId);
    List<ClassRoom> findBySectionIdAndAcademicYear(String sectionId,Integer academicYear);
    List<ClassRoom> findByTeacherInChargeId(String teacherInChargeId);


}