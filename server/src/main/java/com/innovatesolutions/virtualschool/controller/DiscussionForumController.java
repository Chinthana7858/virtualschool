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
@RequestMapping
@AllArgsConstructor
public class DiscussionForumController {
    public final DiscussionForumService discussionForumService;
    private final DiscussionForumRepository discussionForumRepository;

    @PostMapping("api/vi/discussionForum")
    public String AddNewDiscussionForum(@RequestBody DiscussionForum discussionForum){
        discussionForumService.addDiscussionForum(discussionForum);
        return "Discussion created";
    }

    @GetMapping("api/vi/discussionForum")
    public List<DiscussionForum>fetchAllDiscussionForums(){
        return discussionForumService.getAllDiscussionForums();
    }

    @GetMapping("api/vi/discussionForum/{classId}/{subjectId}")
    public ResponseEntity<List<DiscussionForum>> getDiscussionForumsByClassIdAndSubjectId(@PathVariable String classId, @PathVariable String subjectId) {
        List<DiscussionForum> discussionForums = discussionForumService.findByClassIdAndSubjectId(classId, subjectId);
        return new ResponseEntity<>(discussionForums, HttpStatus.OK);
    }

    @DeleteMapping("api/vi/discussionForum/{classId}/{subjectId}/{userId}")
    public ResponseEntity<Void> deleteDiscussionForumByClassIdAndSubjectIdAndUserId(@PathVariable String classId, @PathVariable String subjectId, @PathVariable String userId) {
        discussionForumService.deleteByClassIdAndSubjectIdAndUserid(classId, subjectId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/vi/discussionForum/{classId}/{subjectId}")
    public String saveDiscussionForum(@PathVariable String classId, @PathVariable String subjectId, @RequestBody DiscussionForum discussionForum) {
        DiscussionForum savedDiscussionForum = discussionForumService.saveDiscussionForum(classId, subjectId, discussionForum);
        return "created";
    }

    @GetMapping("api/vi/discussionForum/{id}")
    public Optional<DiscussionForum> getDiscussionForumById(@PathVariable String id) {
        return discussionForumService.getDiscussionForumById(id);

    }

    @GetMapping("api/vi/discussionForum/motherDiscussion/{motherDiscussionId}")
    public List<DiscussionForum> getDiscussionForumsByMotherDiscussionId(@PathVariable String motherDiscussionId) {
        return discussionForumService.getDiscussionForumsByMotherDiscussionId(motherDiscussionId);
    }

    @GetMapping("api/vi/discussionForum/{classId}/{subjectId}/{motherDiscussionId}")
    public List<DiscussionForum> getDiscussionForumsByClassSubjectAndMotherDiscussion(
            @PathVariable("classId") String classId,
            @PathVariable("subjectId") String subjectId,
            @PathVariable("motherDiscussionId") String motherDiscussionId) {
        return discussionForumService.getDiscussionForumsByClassSubjectAndMotherDiscussion(classId, subjectId, motherDiscussionId);
    }

    @DeleteMapping("api/vi/discussionForum/{id}")
    public ResponseEntity<?> deleteDiscussionForumById(@PathVariable String id) {
        discussionForumService.deleteDiscussionForumById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
