package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Subject;
import com.innovatesolutions.virtualschool.service.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/subjects")
@AllArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    //Add a new subject
    @PostMapping
    public String AddNewSubject(@RequestBody Subject subject){
        subjectService.addSubject(subject);
        return "new subject added";

    }

    //Get subject by subjectId
    @GetMapping("/{subjectId}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable String subjectId) {
        Subject subject = subjectService.getSubjectById(subjectId);
        if (subject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }

    //Delete subject by subjectId
    @DeleteMapping("/{subjectId}")
    public ResponseEntity<Void> deleteSubjectById(@PathVariable String subjectId) {
        subjectService.deleteSubjectById(subjectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Get subjects by classRoom
    @GetMapping("/classRoomId/{classRoomId}")
    public ResponseEntity<List<Subject>> findByClassRoomId(@PathVariable String classRoomId) {
        List<Subject> subjects = subjectService.findByClassRoomId(classRoomId);
        return ResponseEntity.ok().body(subjects);
    }

    //Update/Assign teacher to a subject
    @PutMapping("/{id}/teacher/{teacherId}")
    public ResponseEntity<Subject> addTeacherIdToSubject(
            @PathVariable String teacherId,
            @PathVariable String id
    ) {
        return subjectService.addTeacherIdToSubject(id, teacherId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/teacher/{teacherId}")
    public List<Subject> getSubjectsByTeacherId(@PathVariable("teacherId") String teacherId) {
        return subjectService.getSubjectsByTeacherId(teacherId);
    }


}
