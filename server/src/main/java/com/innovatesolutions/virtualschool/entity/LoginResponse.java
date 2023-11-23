package com.innovatesolutions.virtualschool.entity;

public class LoginResponse {
    String msg;
    Boolean status;
    String role;
    String keysec;
    String studentId;

    public LoginResponse(String msg, Boolean status, String role, String keysec,String studentId) {
        this.msg = msg;
        this.status = status;
        this.role = role;
        this.keysec = keysec;
        this.studentId=studentId;
    }

    public LoginResponse() {
    }


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getKeysec() {
        return keysec;
    }

    public void setKeysec(String keysec) {
        this.keysec = keysec;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
