package com.claudia.virtual_store.services;

import com.claudia.virtual_store.dto.CreateDigitalProduct;
import com.claudia.virtual_store.dto.CreatePhysicalProduct;
import com.claudia.virtual_store.entities.DigitalProduct;
import com.claudia.virtual_store.entities.PhysicalProduct;
import com.claudia.virtual_store.entities.Product;

import java.util.List;

public interface ProductService extends CrudService<Product, Long> {
    DigitalProduct saveDigitalProduct(CreateDigitalProduct digitalProduct);

    PhysicalProduct savePhysicalProduct(CreatePhysicalProduct physicalProduct);

    List<Product> findAllWithFilters(String search, String type, int page, int size, String sort, String order);

}