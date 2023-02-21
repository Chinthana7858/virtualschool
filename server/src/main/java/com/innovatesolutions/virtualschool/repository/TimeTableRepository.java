package com.innovatesolutions.virtualschool.repository;
import com.innovatesolutions.virtualschool.entity.TimeTable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface TimeTableRepository extends MongoRepository<TimeTable, String> {


    List<TimeTable> findByClassId(String classId);

    List<TimeTable> findByClassIdAndRowNo(String classId, int rowNo);

    TimeTable save(TimeTable timeTable);
}
