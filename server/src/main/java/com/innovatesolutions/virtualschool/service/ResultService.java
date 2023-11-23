package com.innovatesolutions.virtualschool.service;
import com.innovatesolutions.virtualschool.entity.Result;
import com.innovatesolutions.virtualschool.enums.Term;
import com.innovatesolutions.virtualschool.repository.ResultRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@AllArgsConstructor
@Service
public class ResultService {
    @Autowired
    private final ResultRepository resultRepository;

    public Result getResult(String subjectId, String classId, String userid, Term term) {
        Optional<Result> resultOptional = resultRepository.findBySubjectIdAndClassIdAndUseridAndTerm(subjectId, classId, userid, term);
        return resultOptional.orElse(null);
    }

    public Result saveResult(Result result) {
        Optional<Result> existingResultOptional = resultRepository.
                findBySubjectIdAndClassIdAndUseridAndTerm(
                        result.getSubjectId(),
                        result.getClassId(),
                        result.getUserid(),
                        result.getTerm()
                );
        if(existingResultOptional.isPresent()){
            Result existingResult = existingResultOptional.get();
            existingResult.setResult(result.getResult());
            return resultRepository.save(existingResult);
        }
        return resultRepository.save(result);
    }
}
