package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.SessionLink;
import com.innovatesolutions.virtualschool.service.SessionLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/sessions")

public class SessionLinkController {
    private final SessionLinkService sessionLinkService;
    @Autowired
    public SessionLinkController(SessionLinkService sessionLinkService) {
        this.sessionLinkService = sessionLinkService;
    }

    @PostMapping
    public ResponseEntity<SessionLink> saveSessionLink(@RequestBody SessionLink sessionLink) {
        SessionLink savedSessionLink = sessionLinkService.saveSessionLink(sessionLink);
        return new ResponseEntity<>(savedSessionLink, HttpStatus.CREATED);
    }

    @GetMapping("/topic/{topicId}")
    public List<SessionLink> getSessionLinksByTopicId(@PathVariable String topicId) {
        return sessionLinkService.getSessionLinksByTopicId(topicId);
    }

    @GetMapping
    public ResponseEntity<List<SessionLink>> getAllSessionLinks() {
        List<SessionLink> sessionLinks = sessionLinkService.getAllSessionLinks();
        return ResponseEntity.ok(sessionLinks);
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<String> deleteSessionById(@PathVariable String sessionId) {
        sessionLinkService.deleteSessionById(sessionId);
        return new ResponseEntity<>("Session deleted successfully", HttpStatus.OK);
    }
}
