package com.innovatesolutions.virtualschool.controller;

import com.innovatesolutions.virtualschool.entity.LearningMaterial;
import com.innovatesolutions.virtualschool.service.LearningMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/learning-materials")
public class LearningMaterialController {

    private final LearningMaterialService learningMaterialService;

    @Autowired
    public LearningMaterialController(LearningMaterialService learningMaterialService) {
        this.learningMaterialService = learningMaterialService;
    }

    @PostMapping("/{topicId}/materialUpload")
    public ResponseEntity<String> uploadLearningMaterial(@RequestParam("file") MultipartFile file,
                                                         @PathVariable String topicId,
                                                         @RequestParam("materialName") String materialName,
                                                         @RequestParam("date") String date) {
        LearningMaterial material = new LearningMaterial();
        material.setMaterialName(materialName);
        material.setTopicId(topicId);
        material.setDate(date);

        String materialId = learningMaterialService.uploadLearningMaterial(file, material);
        return ResponseEntity.ok(materialId);
    }

    @GetMapping("/{materialId}/download")
    public ResponseEntity<byte[]> downloadLearningMaterial(@PathVariable String materialId) throws IOException, IOException {
        byte[] data = learningMaterialService.downloadLearningMaterial(materialId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(data.length);
        headers.setContentDisposition(ContentDisposition.builder("inline").filename(materialId + ".pdf").build());
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }

    @DeleteMapping("/{materialId}")
    public ResponseEntity<String> deleteLearningMaterial(@PathVariable String materialId) {
        learningMaterialService.deleteLearningMaterialById(materialId);
        return new ResponseEntity<>("Learning material deleted successfully", HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<LearningMaterial>> getAllLearningMaterials() {
        List<LearningMaterial> learningMaterials = learningMaterialService.getAllLearningMaterials();
        return new ResponseEntity<>(learningMaterials, HttpStatus.OK);
    }
}
