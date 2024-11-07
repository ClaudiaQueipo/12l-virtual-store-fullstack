package com.claudia.virtual_store.dto;


import lombok.Data;

@Data
public class UpdateProduct {
    private String code;
    private String name;
    private String downloadLink; // Para DigitalProduct
    private Double shippingCost; // Para PhysicalProduct
}
