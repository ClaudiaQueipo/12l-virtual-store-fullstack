package com.claudia.virtual_store.dto;

import lombok.Data;

@Data
public class CreatePhysicalProduct {
    private String name;
    private String code;
    private double shippingCost;

}