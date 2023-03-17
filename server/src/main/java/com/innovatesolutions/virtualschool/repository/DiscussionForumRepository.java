package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.DiscussionForum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiscussionForumRepository extends MongoRepository<DiscussionForum, String>  {
    List<DiscussionForum> findByClassIdAndSubjectId(String classId, String subjectId);
    void deleteByClassIdAndSubjectIdAndUserid(String classId, String subjectId, String userid);
    List<DiscussionForum> findByMotherDiscussionId(String motherDiscussionId);
    List<DiscussionForum> findByClassIdAndSubjectIdAndMotherDiscussionId(String classId, String subjectId, String motherDiscussionId);
    void deleteById(String id);
}
