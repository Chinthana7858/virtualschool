package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Section;
import com.innovatesolutions.virtualschool.entity.User;
import com.innovatesolutions.virtualschool.service.SectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping
@AllArgsConstructor
public class SectionController {
    private final SectionService sectionService;

    @GetMapping("api/vi/sections")
    public List<Section> fetchAllSections(){
        return sectionService.getAllSections();
    }


    @PostMapping("api/vi/sections")
    public String AddNewDiscussion(@RequestBody Section section){
        sectionService.addSection(section);
            return "new section added";

    }

    @GetMapping("api/vi/sections/{sectionId}")
    public ResponseEntity<Section> getSectionById(@PathVariable String sectionId) {
        Section section = sectionService.getSectionById(sectionId);
        if (section == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(section, HttpStatus.OK);
    }

    @DeleteMapping("api/vi/sections/{sectionId}")
    public ResponseEntity<Void> deleteSectionById(@PathVariable String sectionId) {
        sectionService.deleteSectionById(sectionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("api/vi/sections/{sectionId}/sectionName")
    public ResponseEntity<String> getSectionNameBySectionId(@PathVariable String sectionId) {
        String sectionName = sectionService.getSectionNameBySectionId(sectionId);
        return new ResponseEntity<>(sectionName, HttpStatus.OK);
    }

    @PutMapping("api/vi/sections/{sectionId}/{sectionHeadId}")
    public Section updateSectionHeadId(@PathVariable String sectionId, @PathVariable String sectionHeadId) {
        return sectionService.updateSectionHeadId(sectionId, sectionHeadId);
    }
}

