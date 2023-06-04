package com.innovatesolutions.virtualschool.repository;

import com.innovatesolutions.virtualschool.entity.SessionLink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionLinkRepository extends MongoRepository<SessionLink,String> {
    List<SessionLink> findByTopicId(String topicId);
}
