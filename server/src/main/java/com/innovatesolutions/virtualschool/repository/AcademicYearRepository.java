package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.AcademicYear;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicYearRepository extends MongoRepository<AcademicYear,String> {
    List<AcademicYear> findBySectionId(String sectionId);
    AcademicYear findByYearAndSectionId(String year, String sectionId);
    void deleteByYearAndSectionId(String year, String sectionId);
}
