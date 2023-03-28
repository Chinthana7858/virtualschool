package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Result;
import com.innovatesolutions.virtualschool.enums.Term;
import com.innovatesolutions.virtualschool.service.ResultService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/result")
@AllArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @GetMapping("/{subjectId}/{classId}/{userid}/{term}")
    public ResponseEntity<Result> getResult(
            @PathVariable String subjectId,
            @PathVariable String classId,
            @PathVariable String userid,
            @PathVariable Term term
    ) {
        Result resultRetrieved = resultService.getResult(subjectId, classId, userid, term);
        return new ResponseEntity<>(resultRetrieved, HttpStatus.OK);
    }

    @PostMapping("/{subjectId}/{classId}/{userid}/{term}")
    public ResponseEntity<Result> saveResult(@RequestBody Result result) {
        Result savedResult = resultService.saveResult(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }
}
