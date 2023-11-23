package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.AcademicYear;
import com.innovatesolutions.virtualschool.service.AcademicYearService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/academic")
@AllArgsConstructor
public class AcademicYearController {
    private final AcademicYearService academicYearService;

    //Create a new academic year
    @PostMapping("/create")
    public ResponseEntity<Object> createAcademicYear(@RequestBody AcademicYear academicYear) {
        try {
            AcademicYear savedAcademicYear = academicYearService.createAcademicYear(academicYear);
            return ResponseEntity.ok(savedAcademicYear);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Get academic years by sectionId
    @GetMapping("/{sectionId}")
    public List<AcademicYear> getAcademicYearsBySectionId(@PathVariable String sectionId) {
        return academicYearService.getAcademicYearsBySectionId(sectionId);
    }

    //Delete academic year by sectionId and year
    @DeleteMapping("/{year}/{sectionId}")
    public ResponseEntity<Void> deleteAcademicYear(@PathVariable Integer year, @PathVariable String sectionId) {
        academicYearService.deleteAcademicYear(year, sectionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
