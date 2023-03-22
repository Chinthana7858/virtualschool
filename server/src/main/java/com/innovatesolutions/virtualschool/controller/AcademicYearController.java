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
@RequestMapping
@AllArgsConstructor
public class AcademicYearController {
    private final AcademicYearService academicYearService;

    @PostMapping("api/vi/academic/create")
    public ResponseEntity<Object> createAcademicYear(@RequestBody AcademicYear academicYear) {
        try {
            AcademicYear savedAcademicYear = academicYearService.createAcademicYear(academicYear);
            return ResponseEntity.ok(savedAcademicYear);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("api/vi/academic/{sectionId}")
    public List<AcademicYear> getAcademicYearsBySectionId(@PathVariable String sectionId) {
        return academicYearService.getAcademicYearsBySectionId(sectionId);
    }


    @DeleteMapping("api/vi/academic/{year}/{sectionId}")
    public ResponseEntity<Void> deleteAcademicYear(@PathVariable String year, @PathVariable String sectionId) {
        academicYearService.deleteAcademicYear(year, sectionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
