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
@RequestMapping("api/v1/classrooms")
@AllArgsConstructor
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    //Add new classRoom
    @PostMapping
    public String AddNewClassRoom(@RequestBody ClassRoom classRoom){
        classRoomService.addClassRoom(classRoom);
        return "new classroom added";

    }

    //Get classRoom by classRoomId
    @GetMapping("/{classRoomId}")
    public ResponseEntity<ClassRoom> getClassRoomByClassRoomId(@PathVariable String classRoomId) {
        ClassRoom classRoom = classRoomService.getClassRoomByClassRoomId(classRoomId);
        if (classRoom == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(classRoom, HttpStatus.OK);
    }

    //Get classRoom byId
    @GetMapping("/{id}/classroom")
    public ResponseEntity<ClassRoom> getClassRoomById(@PathVariable String id) {
        return classRoomService.getClassRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Delete classRoom byId
    @DeleteMapping("/{classRoomId}")
    public ResponseEntity<Void> deleteClassRoomById(@PathVariable String classRoomId) {
        classRoomService.deleteClassRoomById(classRoomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Get classRoom by section and academic year
    @GetMapping("/sectionId/{sectionId}/Academic/{academicYear}")
    public ResponseEntity<List<ClassRoom>> getClassroomsBySectionIdAndAcademicYear(@PathVariable String sectionId,@PathVariable Integer academicYear) {
        List<ClassRoom> classrooms = classRoomService.getClassroomsBySectionIdAndAcademicYear(sectionId,academicYear);
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }

    //Update/Assign teacher in charge
    @PutMapping("/{classRoomId}/teacher/{teacherInChargeId}")
    public ResponseEntity<String> updateTeacherInChargeId(@PathVariable String classRoomId, @PathVariable String teacherInChargeId) {
        classRoomService.updateTeacherInChargeId(classRoomId, teacherInChargeId);
        return ResponseEntity.ok("Teacher in charge updated for classroom id: " + classRoomId);
    }


    @GetMapping("/teacher/{teacherInChargeId}")
    public List<ClassRoom> getClassRoomsByTeacherInChargeId(@PathVariable String teacherInChargeId) {
        return classRoomService.getClassRoomsByTeacherInChargeId(teacherInChargeId);
    }

}
