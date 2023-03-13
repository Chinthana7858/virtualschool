package com.innovatesolutions.virtualschool.controller;
import com.innovatesolutions.virtualschool.entity.Result;
import com.innovatesolutions.virtualschool.service.ResultService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping
@AllArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @GetMapping("api/vi/result/{subjectId}/{classId}/{userid}/{term}")
    public ResponseEntity<Result> getResult(
            @PathVariable String subjectId,
            @PathVariable String classId,
            @PathVariable String userid,
            @PathVariable String term
    ) {
        Result resultRetrieved = resultService.getResult(subjectId, classId, userid, term);
        return new ResponseEntity<>(resultRetrieved, HttpStatus.OK);
    }

    @PostMapping("api/vi/results/{subjectId}/{classId}/{userid}/{term}")
    public ResponseEntity<Result> saveResult(@RequestBody Result result) {
        Result savedResult = resultService.saveResult(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }
}
