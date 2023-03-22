package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ResultRepository extends MongoRepository<Result,String> {
    Optional<Result> findBySubjectIdAndClassIdAndUseridAndTerm(String subjectId, String classId, String userid, String term);
}
