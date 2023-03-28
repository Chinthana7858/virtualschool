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

    //Create new discussion forum
    public DiscussionForum addDiscussionForum(DiscussionForum discussionForum) {
        return discussionForumRepository.save(discussionForum);
    }

    //Get all discussion forums
    public List<DiscussionForum> getAllDiscussionForums(){
        return discussionForumRepository.findAll();
    }

    //Get discussion forum by class and subject
    public List<DiscussionForum> findByClassIdAndSubjectId(String classId, String subjectId) {
        return discussionForumRepository.findByClassIdAndSubjectId(classId, subjectId);
    }

    //Delete discussion forum by classId and subjectId and userId
    public void deleteByClassIdAndSubjectIdAndUserid(String classId, String subjectId, String userid) {
        discussionForumRepository.deleteByClassIdAndSubjectIdAndUserid(classId, subjectId, userid);
    }

    //Create new discussion forum by classId and subjectId
    public DiscussionForum saveDiscussionForum(String classId, String subjectId, DiscussionForum discussionForum) {
        discussionForum.setClassId(classId);
        discussionForum.setSubjectId(subjectId);
        return discussionForumRepository.save(discussionForum);
    }


    //Get discussion forum by id
    public Optional<DiscussionForum> getDiscussionForumById(String id) {
        return discussionForumRepository.findById(id);
    }

    //Get reply by main discussion
    public List<DiscussionForum> getDiscussionForumsByMotherDiscussionId(String motherDiscussionId) {
        return discussionForumRepository.findByMotherDiscussionId(motherDiscussionId);
    }

    //Get reply by class subject and main discussion
    public List<DiscussionForum> getDiscussionForumsByClassSubjectAndMotherDiscussion(String classId, String subjectId, String motherDiscussionId) {
        return discussionForumRepository.findByClassIdAndSubjectIdAndMotherDiscussionId(classId, subjectId, motherDiscussionId);
    }

    //Delete discussion forum by id
    public void deleteDiscussionForumById(String id) {
        discussionForumRepository.deleteById(id);
    }
}
