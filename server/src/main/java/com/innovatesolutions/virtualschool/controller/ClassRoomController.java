package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.ClassRoom;
import com.innovatesolutions.virtualschool.service.ClassRoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping
@AllArgsConstructor
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @PostMapping("api/vi/classrooms")
    public String AddNewClassRoom(@RequestBody ClassRoom classRoom){
        classRoomService.addClassRoom(classRoom);
        return "new classroom added";

    }

    @GetMapping("api/vi/classrooms/{classRoomId}")
    public ResponseEntity<ClassRoom> getClassRoomByClassRoomId(@PathVariable String classRoomId) {
        ClassRoom classRoom = classRoomService.getClassRoomByClassRoomId(classRoomId);
        if (classRoom == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(classRoom, HttpStatus.OK);
    }

    @GetMapping("api/vi/classrooms/{id}/classroom")
    public ResponseEntity<ClassRoom> getClassRoomById(@PathVariable String id) {
        return classRoomService.getClassRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("api/vi/classrooms/{classRoomId}")
    public ResponseEntity<Void> deleteClassRoomById(@PathVariable String classRoomId) {
        classRoomService.deleteClassRoomById(classRoomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("api/vi/classrooms/sectionId/{sectionId}/Academic/{academicYear}")
    public ResponseEntity<List<ClassRoom>> getClassroomsBySectionIdAndAcademicYear(@PathVariable String sectionId,@PathVariable String academicYear) {
        List<ClassRoom> classrooms = classRoomService.getClassroomsBySectionIdAndAcademicYear(sectionId,academicYear);
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }

    @PutMapping("api/vi/classrooms/{classRoomId}/teacher/{teacherInChargeId}")
    public ResponseEntity<String> updateTeacherInChargeId(@PathVariable String classRoomId, @PathVariable String teacherInChargeId) {
        classRoomService.updateTeacherInChargeId(classRoomId, teacherInChargeId);
        return ResponseEntity.ok("Teacher in charge updated for classroom id: " + classRoomId);
    }

}
