package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.DiscussionForum;
import com.innovatesolutions.virtualschool.repository.DiscussionForumRepository;
import com.innovatesolutions.virtualschool.service.DiscussionForumService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("api/v1/discussionForum")
@AllArgsConstructor
public class DiscussionForumController {
    public final DiscussionForumService discussionForumService;
    private final DiscussionForumRepository discussionForumRepository;

    //Create new discussion
    @PostMapping
    public String AddNewDiscussionForum(@RequestBody DiscussionForum discussionForum){
        discussionForumService.addDiscussionForum(discussionForum);
        return "Discussion created";
    }

    //Get all discussions
    @GetMapping
    public List<DiscussionForum>fetchAllDiscussionForums(){
        return discussionForumService.getAllDiscussionForums();
    }

    //Get discussions by class and subject
    @GetMapping("{classId}/{subjectId}")
    public ResponseEntity<List<DiscussionForum>> getDiscussionForumsByClassIdAndSubjectId(@PathVariable String classId, @PathVariable String subjectId) {
        List<DiscussionForum> discussionForums = discussionForumService.findByClassIdAndSubjectId(classId, subjectId);
        return new ResponseEntity<>(discussionForums, HttpStatus.OK);
    }

    //Delete discussion by class,subject and user
    @DeleteMapping("/{classId}/{subjectId}/{userId}")
    public ResponseEntity<Void> deleteDiscussionForumByClassIdAndSubjectIdAndUserId(@PathVariable String classId, @PathVariable String subjectId, @PathVariable String userId) {
        discussionForumService.deleteByClassIdAndSubjectIdAndUserid(classId, subjectId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Create discussion by class and subject
    @PostMapping("/{classId}/{subjectId}")
    public String saveDiscussionForum(@PathVariable String classId, @PathVariable String subjectId, @RequestBody DiscussionForum discussionForum) {
        DiscussionForum savedDiscussionForum = discussionForumService.saveDiscussionForum(classId, subjectId, discussionForum);
        return "created";
    }

    //Get discussion by id
    @GetMapping("/{id}")
    public Optional<DiscussionForum> getDiscussionForumById(@PathVariable String id) {
        return discussionForumService.getDiscussionForumById(id);

    }

    //Get replies by main discussion
    @GetMapping("/motherDiscussion/{motherDiscussionId}")
    public List<DiscussionForum> getDiscussionForumsByMotherDiscussionId(@PathVariable String motherDiscussionId) {
        return discussionForumService.getDiscussionForumsByMotherDiscussionId(motherDiscussionId);
    }

    //Get reply by class,subject and main discussion
    @GetMapping("/{classId}/{subjectId}/{motherDiscussionId}")
    public List<DiscussionForum> getDiscussionForumsByClassSubjectAndMotherDiscussion(
            @PathVariable("classId") String classId,
            @PathVariable("subjectId") String subjectId,
            @PathVariable("motherDiscussionId") String motherDiscussionId) {
        return discussionForumService.getDiscussionForumsByClassSubjectAndMotherDiscussion(classId, subjectId, motherDiscussionId);
    }

    //Delete discussion by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiscussionForumById(@PathVariable String id) {
        discussionForumService.deleteDiscussionForumById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
