package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.ClassRoom;
import com.innovatesolutions.virtualschool.repository.ClassRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ClassRoomService {
    @Autowired
    private final ClassRoomRepository classRoomRepository;

    //Add new classRoom
    public void addClassRoom(ClassRoom classRoom) {

        try {
            classRoomRepository.save(classRoom);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to add subject.", ex);
        }
    }

    //Get classRoom by classRoomId
    public ClassRoom getClassRoomByClassRoomId(String classRoomId) {
        return classRoomRepository.findByClassRoomId(classRoomId);
    }

    //Get classRoom byId
    public Optional<ClassRoom> getClassRoomById(String id) {
        return classRoomRepository.findById(id);
    }
    //Delete classRoom byId
    public void deleteClassRoomById(String classRoomId) {
        classRoomRepository.deleteById(classRoomId);
    }

    //Get classRoom by section and academic year
    public List<ClassRoom> getClassroomsBySectionIdAndAcademicYear(String sectionId,Integer academicYear) {
        return classRoomRepository.findBySectionIdAndAcademicYear(sectionId,academicYear);
    }

    //Update/Assign a teacher in charge
    public void updateTeacherInChargeId(String classRoomId, String teacherInChargeId) {
        Optional<ClassRoom> optionalClassRoom = classRoomRepository.findById(classRoomId);
        if (optionalClassRoom.isPresent()) {
            ClassRoom classRoom = optionalClassRoom.get();
            classRoom.setTeacherInChargeId(teacherInChargeId);
            classRoomRepository.save(classRoom);
        } else {
            throw new RuntimeException("Classroom not found for id: " + classRoomId);
        }
    }

    public List<ClassRoom> getClassRoomsByTeacherInChargeId(String teacherInChargeId) {
        return classRoomRepository.findByTeacherInChargeId(teacherInChargeId);
    }

}
