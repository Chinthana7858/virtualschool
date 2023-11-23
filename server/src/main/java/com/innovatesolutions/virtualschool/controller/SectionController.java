package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Section;
import com.innovatesolutions.virtualschool.service.SectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/sections")
@AllArgsConstructor
public class SectionController {
    private final SectionService sectionService;

    //Get all sections
    @GetMapping
    public List<Section> fetchAllSections(){
        return sectionService.getAllSections();
    }

    //Add a new section
    @PostMapping
    public String AddNewDiscussion(@RequestBody Section section){
        sectionService.addSection(section);
            return "new section added";

    }

    //Get section by sectionId
    @GetMapping("/{sectionId}")
    public ResponseEntity<Section> getSectionById(@PathVariable String sectionId) {
        Section section = sectionService.getSectionById(sectionId);
        if (section == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(section, HttpStatus.OK);
    }

    //Delete section by sectionId
    @DeleteMapping("/{sectionId}")
    public ResponseEntity<Void> deleteSectionById(@PathVariable String sectionId) {
        sectionService.deleteSectionById(sectionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Get section name by sectionId
    @GetMapping("/{sectionId}/sectionName")
    public ResponseEntity<String> getSectionNameBySectionId(@PathVariable String sectionId) {
        String sectionName = sectionService.getSectionNameBySectionId(sectionId);
        return new ResponseEntity<>(sectionName, HttpStatus.OK);
    }

    //Update/Assign section head
    @PutMapping("/{sectionId}/{sectionHeadId}")
    public Section updateSectionHeadId(@PathVariable String sectionId, @PathVariable String sectionHeadId) {
        return sectionService.updateSectionHeadId(sectionId, sectionHeadId);
    }

    @GetMapping("/sectionHead/{sectionHeadId}")
    public ResponseEntity<List<Section>> getSectionsBySectionHeadId(@PathVariable("sectionHeadId") String sectionHeadId) {
        List<Section> sections = sectionService.getSectionsBySectionHeadId(sectionHeadId);
        return new ResponseEntity<>(sections, HttpStatus.OK);
    }
}

