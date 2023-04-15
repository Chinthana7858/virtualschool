package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.LearningMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LearningMaterialRepository extends MongoRepository<LearningMaterial,String> {
}
