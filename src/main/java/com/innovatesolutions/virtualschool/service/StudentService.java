package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.repository.StudentRepository;
import com.innovatesolutions.virtualschool.entity.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;
    public List<Student> getAllStudents(){
        return studentRepository.findAll();

    }
}
