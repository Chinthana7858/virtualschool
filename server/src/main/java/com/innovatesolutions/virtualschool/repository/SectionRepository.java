package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.Section;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends MongoRepository<Section,String> {
    Section findBySectionId(String sectionId);
    List<Section> findBySectionHeadId(String sectionHeadId);
}
