package com.innovatesolutions.virtualschool.entity;
import com.innovatesolutions.virtualschool.enums.Gender;
import com.innovatesolutions.virtualschool.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class User {
    @Id
    private String userid;
    private String userState ="pending";
    private UserRole userRole;
    private String nameWithInitials;
    private String fullName;
    private String phoneNo;
    private String dateOfBirth;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String password;
    private String NIC;
    private Gender gender;
    private String address;
    private String stUserid;
    private List<String> classIds;
    public User(){

    }

    public User(String userid,
                String userState,
                UserRole userRole,
                String nameWithInitials,
                String fullName,
                String phoneNo,
                String dateOfBirth,
                String email,
                String NIC,
                Gender gender,
                String address,
                List<String> classIds,String password, String stUserid) {
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
        this.classIds = classIds;
        this.password=password;
        this.stUserid=stUserid;
    }

    public void setClassIds(List<String> classIds) {
        this.classIds = classIds;
    }

    public String getUserid(){
        return userid;
    }
    public void setUserid(String userid){
        this.userid=userid;
    }
    
    public String getFullName(){
        return fullName;
    }
    public void setFullName(String fullName){
        this.fullName=fullName;
    }
    
    public String getPhoneNo(){
        return phoneNo;
    }
    public void setPhoneNo(String phoneNo){
        this.phoneNo=phoneNo;
    }
    
    public UserRole getUserRole(){
        return userRole;
    }
    public void setUserRole(UserRole userRole){
        this.userRole=userRole;
    }
    
    public String getDateOfBirth(){
        return dateOfBirth;
    }
    public void setDateOfBirth(String dateOfBirth){
        this.dateOfBirth=dateOfBirth;
    }
    
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email=email;
    }
    
    public String getNIC(){
        return NIC;
    }
    public void setNIC(String NIC){
        this.NIC=NIC;
    }
    
    public String getAddress(){
        return address;
    }
    public void setAddress(String address){
        this.address=address;
    }
    public String getpassword(){
        return password;
    }
    public void setpassword(String password){
        this.password=password;
    }
    public String getstUserid(){
        return stUserid;
    }
    public void setstUserid(String stUserid){
        this.stUserid=stUserid;
    }

}
