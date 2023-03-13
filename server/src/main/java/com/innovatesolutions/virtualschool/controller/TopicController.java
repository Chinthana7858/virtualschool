package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Topic;
import com.innovatesolutions.virtualschool.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping
@AllArgsConstructor
public class TopicController {
    public final TopicService topicService;

    @GetMapping("api/vi/topics")
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @GetMapping("api/vi/{topicId}")
    public ResponseEntity<Topic> getTopicById(@PathVariable String topicId) {
        Optional<Topic> topic = topicService.getTopicById(topicId);
        return topic.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("api/vi/topic")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        topicService.saveTopic(topic);
        return new ResponseEntity<>(topic, HttpStatus.CREATED);
    }

    @DeleteMapping("api/vi/{topicId}")
    public ResponseEntity<HttpStatus> deleteTopic(@PathVariable String topicId) {
        try {
            topicService.deleteTopic(topicId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
