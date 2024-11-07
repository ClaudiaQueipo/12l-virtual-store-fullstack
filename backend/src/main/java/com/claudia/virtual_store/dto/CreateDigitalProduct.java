package com.claudia.virtual_store.dto;


import lombok.Data;

@Data
public class CreateDigitalProduct {
    private String name;
    private String code;
    private String downloadLink;

}