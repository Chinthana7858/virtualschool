package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.AcademicYear;
import com.innovatesolutions.virtualschool.repository.AcademicYearRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AcademicYearService {
    @Autowired
    private final AcademicYearRepository academicYearRepository;

    public AcademicYear createAcademicYear(AcademicYear academicYear) throws Exception {
        String year = academicYear.getYear();
        String sectionId = academicYear.getSectionId();

        // Check if the academic year already exists
        AcademicYear existingAcademicYear = academicYearRepository.findByYearAndSectionId(year, sectionId);
        if (existingAcademicYear != null) {
            throw new Exception("Academic year already exists for section " + sectionId + " and year " + year);
        }

        return academicYearRepository.save(academicYear);
    }


    public List<AcademicYear> getAcademicYearsBySectionId(String sectionId) {
        return academicYearRepository.findBySectionId(sectionId);
    }


    public void deleteAcademicYear(String year, String sectionId) {
        academicYearRepository.deleteByYearAndSectionId(year, sectionId);
    }
}
