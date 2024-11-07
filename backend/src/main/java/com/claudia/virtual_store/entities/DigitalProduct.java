package com.claudia.virtual_store.entities;


import jakarta.persistence.DiscriminatorValue;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@DiscriminatorValue("DIGITAL")
public class DigitalProduct extends Product {
    private String downloadLink;
}