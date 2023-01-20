package com.innovatesolutions.virtualschool.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
public class Address {
    private String number;
    private String street;
    private String city;
}
