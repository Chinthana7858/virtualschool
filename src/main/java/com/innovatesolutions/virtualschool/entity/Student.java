package com.innovatesolutions.virtualschool.entity;

import com.innovatesolutions.virtualschool.enums.Gender;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Student {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userid;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phoneNo;
    private String dateOfBirth;
    @Indexed(unique = true)
    private String email;
    private Gender gender;
    private Address address;

    public Student(String userid,
                   String firstName,
                   String lastName,
                   String fullName,
                   String phoneNo,
                   String dateOfBirth,
                   String email,
                   Gender gender,
                   Address address) {
        this.userid= userid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName=fullName;
        this.phoneNo=phoneNo;
        this.dateOfBirth=dateOfBirth;
        this.email = email;
        this.gender = gender;
        this.address = address;
    }
}
