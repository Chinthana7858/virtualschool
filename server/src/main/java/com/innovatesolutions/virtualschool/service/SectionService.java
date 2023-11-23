package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.Section;
import com.innovatesolutions.virtualschool.repository.SectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@AllArgsConstructor
@Service
public class SectionService {
    @Autowired
    private final SectionRepository sectionRepository;

    //Get all sections
    public List<Section> getAllSections(){
        return sectionRepository.findAll();
    }

    //Add new section
    public void addSection(Section section) {
        if (sectionRepository.findBySectionId(section.getSectionId()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Subject with subjectId " + section.getSectionId() + " already exists.");
        }

        try {
            sectionRepository.save(section);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to add subject.", ex);
        }
    }

    //Get section by sectionId
    public Section getSectionById(String sectionId) {
        return sectionRepository.findBySectionId(sectionId);
    }

    //Delete section by sectionId
    public void deleteSectionById(String sectionId) {
        sectionRepository.deleteById(sectionId);
    }

    //Get section name by sectionId
    public String getSectionNameBySectionId(String sectionId) {
        Section section = sectionRepository.findBySectionId(sectionId);
        return section.getSectionName();
    }

    //Update/Assign section head
    public Section updateSectionHeadId(String sectionId, String sectionHeadId) {
        Section section = sectionRepository.findBySectionId(sectionId);
        if (section == null) {
            throw new RuntimeException("Section not found with sectionId: " + sectionId);
        }
        section.setSectionHeadId(sectionHeadId);
        return sectionRepository.save(section);
    }

    public List<Section> getSectionsBySectionHeadId(String sectionHeadId) {
        return sectionRepository.findBySectionHeadId(sectionHeadId);
    }
}
