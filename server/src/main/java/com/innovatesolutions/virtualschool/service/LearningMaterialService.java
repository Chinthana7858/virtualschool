package com.innovatesolutions.virtualschool.service;

import com.innovatesolutions.virtualschool.enums.BucketName;
import com.innovatesolutions.virtualschool.entity.LearningMaterial;
import com.innovatesolutions.virtualschool.fileStore.FileStore;
import com.innovatesolutions.virtualschool.repository.LearningMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
public class LearningMaterialService {
    private final LearningMaterialRepository repository;
    private final FileStore fileStore;

    @Autowired
    public LearningMaterialService(LearningMaterialRepository repository, FileStore fileStore) {
        this.repository = repository;
        this.fileStore = fileStore;
    }

    public String uploadLearningMaterial(MultipartFile file, LearningMaterial material) {
        // 1. Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file");
        }

        // 2. Check if file is a PDF
        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalStateException("Only PDF files are allowed");
        }

        // 3. Store material in MongoDB
        String materialId = UUID.randomUUID().toString();
        material.setMaterialId(materialId);
        repository.save(material);

        // 4. Store the file in S3 and update material link in MongoDB
        String path = String.format("%s/%s", BucketName.LEARNING_MATERIAL.getBucketName(), materialId);
        String fileName = String.format("%s.pdf", materialId);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        try (InputStream inputStream = file.getInputStream()) {
            fileStore.save(path, fileName, Optional.of(metadata), inputStream);
            material.setMaterialLink(fileStore.getUrl(path, fileName));
            repository.save(material);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store file to S3", e);
        }

        return materialId;
    }

    public byte[] downloadLearningMaterial(String materialId) throws IOException {
        LearningMaterial material = repository.findById(materialId)
                .orElseThrow(() -> new IllegalStateException("Material not found"));

        String fileName = String.format("%s.pdf", materialId);
        String path = String.format("%s/%s", BucketName.LEARNING_MATERIAL.getBucketName(), materialId);

        byte[] inputStream = fileStore.download(path, fileName);

        if (inputStream == null) {
            throw new IllegalStateException("Failed to download file from S3");
        }

        return inputStream;
    }
    public void deleteLearningMaterial(String materialId) {
        LearningMaterial material = repository.findById(materialId)
                .orElseThrow(() -> new IllegalStateException("Material not found"));

        String fileName = String.format("%s.pdf", materialId);
        String path = String.format("%s/%s", BucketName.LEARNING_MATERIAL.getBucketName(), materialId);

        boolean fileDeleted = fileStore.delete(path, fileName);

        if (!fileDeleted) {
            throw new IllegalStateException("Failed to delete file from S3");
        }

        repository.deleteById(materialId);
    }
}