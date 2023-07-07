package com.innovatesolutions.virtualschool.enums;

public enum BucketName {
    LEARNING_MATERIAL("virtualschool3"),
    ASSIGNMENTS("virtualschool3");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }


}
