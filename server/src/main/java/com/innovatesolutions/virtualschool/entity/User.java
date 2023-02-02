package com.innovatesolutions.virtualschool.entity;
import com.innovatesolutions.virtualschool.enums.Gender;
import com.innovatesolutions.virtualschool.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document
public class User {

    @Indexed(unique = true)
    private String userid;
    private UserRole userRole;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phoneNo;
    private String dateOfBirth;
    private String email;
    private Gender gender;
    private Address address;

    public User(
                String userid,
                UserRole userRole,
                String firstName,
                String lastName,
                String fullName,
                String phoneNo,
                String dateOfBirth,
                String email,
                Gender gender,
                Address address) {

        this.userid= userid;
        this.userRole=userRole;
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
