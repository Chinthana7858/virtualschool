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
@RequestMapping
@AllArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;
    @PostMapping("api/vi/subjects")
    public String AddNewSubject(@RequestBody Subject subject){
        subjectService.addSubject(subject);
        return "new subject added";

    }

    @GetMapping("api/vi/subjects/{subjectId}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable String subjectId) {
        Subject subject = subjectService.getSubjectById(subjectId);
        if (subject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }

    @DeleteMapping("api/vi/subjects/{subjectId}")
    public ResponseEntity<Void> deleteSubjectById(@PathVariable String subjectId) {
        subjectService.deleteSubjectById(subjectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("api/vi/subjects/classRoomId/{classRoomId}")
    public ResponseEntity<List<Subject>> findByClassRoomId(@PathVariable String classRoomId) {
        List<Subject> subjects = subjectService.findByClassRoomId(classRoomId);
        return ResponseEntity.ok().body(subjects);
    }

    @PutMapping("api/vi/subjects/{id}/teacher/{teacherId}")
    public ResponseEntity<Subject> addTeacherIdToSubject(
            @PathVariable String teacherId,
            @PathVariable String id
    ) {
        return subjectService.addTeacherIdToSubject(id, teacherId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
