package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.LearningMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LearningMaterialRepository extends MongoRepository<LearningMaterial,String> {
    List<LearningMaterial> findByTopicId(String topicId);
}
