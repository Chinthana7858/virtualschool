package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends MongoRepository<Subject,String> {
    Subject findBySubjectId(String subjectId);
    List<Subject> findByClassRoomId(String classRoomId);
    List<Subject> findByTeacherId(String teacherId);
}
