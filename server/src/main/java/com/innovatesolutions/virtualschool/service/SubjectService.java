package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.Subject;
import com.innovatesolutions.virtualschool.repository.SubjectRepository;
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
public class SubjectService {
    @Autowired
    private final SubjectRepository subjectRepository;

    public void addSubject(Subject subject) {
        if (subjectRepository.findBySubjectId(subject.getSubjectId()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Subject with subjectId " + subject.getSubjectId() + " already exists.");
        }

        try {
            subjectRepository.save(subject);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to add subject.", ex);
        }
    }

    public Subject getSubjectById(String subjectId) {
        return subjectRepository.findBySubjectId(subjectId);
    }

    public void deleteSubjectById(String subjectId) {
        subjectRepository.deleteById(subjectId);
    }

    public List<Subject> findByClassRoomId(String classRoomId) {
        return subjectRepository.findByClassRoomId(classRoomId);
    }

    public Optional<Subject> addTeacherIdToSubject(String subjectId, String teacherId) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        if (optionalSubject.isPresent()) {
            Subject subject = optionalSubject.get();
            subject.setTeacherId(teacherId);
            return Optional.of(subjectRepository.save(subject));
        }
        return Optional.empty();
    }
}