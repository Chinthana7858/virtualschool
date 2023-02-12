package com.innovatesolutions.virtualschool.entity;
import com.innovatesolutions.virtualschool.enums.Gender;
import com.innovatesolutions.virtualschool.enums.userRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document
public class User {
    @Id
    private String userid;
    private String userState;
    private userRole userRole;
    private String nameWithInitials;
    private String fullName;
    private String phoneNo;
    private String dateOfBirth;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String NIC;
    private Gender gender;
    private String address;

    public User(String userid,
                String userState,
                userRole userRole,
                String nameWithInitials,
                String fullName,
                String phoneNo,
                String dateOfBirth,
                String email,
                String NIC,
                Gender gender,
                String address) {
        this.userid= userid;
        this.userState=userState;
        this.userRole=userRole;
        this.nameWithInitials = nameWithInitials;
        this.fullName=fullName;
        this.phoneNo=phoneNo;
        this.dateOfBirth=dateOfBirth;
        this.email = email;
        this.NIC = NIC;
        this.gender = gender;
        this.address = address;
    }



}
