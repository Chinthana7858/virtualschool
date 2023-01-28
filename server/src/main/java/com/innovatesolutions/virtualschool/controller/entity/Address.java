package com.innovatesolutions.virtualschool.controller.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Address {
    private String number;
    private String street;
    private String city;
}
