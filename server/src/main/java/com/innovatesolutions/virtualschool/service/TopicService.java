package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.Topic;
import com.innovatesolutions.virtualschool.repository.TopicRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TopicService {
    @Autowired
    private final TopicRepository topicRepository;
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Optional<Topic> getTopicById(String topicId) {
        return topicRepository.findById(topicId);
    }

    public void saveTopic(Topic topic) {
        topicRepository.save(topic);
    }

    public void deleteTopic(String topicId) {
        topicRepository.deleteById(topicId);
    }
    public List<Topic> findBySubjectId(String subjectId) {
        return topicRepository.findBySubjectId(subjectId);
    }
}
