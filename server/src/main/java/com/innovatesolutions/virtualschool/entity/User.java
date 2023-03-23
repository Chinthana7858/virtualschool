package com.innovatesolutions.virtualschool.entity;
import com.innovatesolutions.virtualschool.enums.Gender;
import com.innovatesolutions.virtualschool.enums.UserRole;
import com.mongodb.lang.NonNull;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document
public class User {
    @Id
    private String userid;
    
    private String userState="pending";
    
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
                String address,String password, String stUserid) {
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
        this.password=password;
        this.stUserid=stUserid;
    }

public String getUserid(){
    return userid;
}
public void setUserid(String userid){
    this.userid=userid;
}

public String getFullname(){
    return fullName;
}
public void setFullname(String fullName){
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

public String getdateOfBirth(){
    return dateOfBirth;
}
public void setdateOfBirth(String dateOfBirth){
    this.dateOfBirth=dateOfBirth;
}

public String getemail(){
    return email;
}
public void setemail(String email){
    this.email=email;
}

public String getNIC(){
    return NIC;
}
public void setNIC(String NIC){
    this.NIC=NIC;
}

public String getaddress(){
    return address;
}
public void setaddress(String address){
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
