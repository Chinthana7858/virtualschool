package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic,String> {
    List<Topic> findBySubjectId(String subjectId);
}
