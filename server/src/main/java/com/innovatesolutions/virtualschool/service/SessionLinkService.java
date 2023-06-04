package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.entity.SessionLink;
import com.innovatesolutions.virtualschool.repository.SessionLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionLinkService {
    @Autowired
    private final SessionLinkRepository sessionLinkRepository;
    @Autowired
    public SessionLinkService(SessionLinkRepository sessionLinkRepository) {
        this.sessionLinkRepository = sessionLinkRepository;
    }

    public SessionLink saveSessionLink(SessionLink sessionLink) {
        return sessionLinkRepository.save(sessionLink);
    }

    public List<SessionLink> getSessionLinksByTopicId(String topicId) {
        return sessionLinkRepository.findByTopicId(topicId);
    }

    public List<SessionLink> getAllSessionLinks() {
        return sessionLinkRepository.findAll();
    }

    public void deleteSessionById(String sessionId) {
        sessionLinkRepository.deleteById(sessionId);
    }
}
