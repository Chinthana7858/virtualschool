package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.DiscussionForum;
import com.innovatesolutions.virtualschool.repository.DiscussionForumRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DiscussionForumService {
    @Autowired
    private final DiscussionForumRepository discussionForumRepository;

    public DiscussionForum addDiscussionForum(DiscussionForum discussionForum) {
        return discussionForumRepository.save(discussionForum);
    }

    public List<DiscussionForum> getAllDiscussionForums(){
        return discussionForumRepository.findAll();
    }

    public List<DiscussionForum> findByClassIdAndSubjectId(String classId, String subjectId) {
        return discussionForumRepository.findByClassIdAndSubjectId(classId, subjectId);
    }

    public void deleteByClassIdAndSubjectIdAndUserid(String classId, String subjectId, String userid) {
        discussionForumRepository.deleteByClassIdAndSubjectIdAndUserid(classId, subjectId, userid);
    }

    public DiscussionForum saveDiscussionForum(String classId, String subjectId, DiscussionForum discussionForum) {
        discussionForum.setClassId(classId);
        discussionForum.setSubjectId(subjectId);
        return discussionForumRepository.save(discussionForum);
    }


    public Optional<DiscussionForum> getDiscussionForumById(String id) {
        return discussionForumRepository.findById(id);
    }

    public List<DiscussionForum> getDiscussionForumsByMotherDiscussionId(String motherDiscussionId) {
        return discussionForumRepository.findByMotherDiscussionId(motherDiscussionId);
    }

    public List<DiscussionForum> getDiscussionForumsByClassSubjectAndMotherDiscussion(String classId, String subjectId, String motherDiscussionId) {
        return discussionForumRepository.findByClassIdAndSubjectIdAndMotherDiscussionId(classId, subjectId, motherDiscussionId);
    }
}
