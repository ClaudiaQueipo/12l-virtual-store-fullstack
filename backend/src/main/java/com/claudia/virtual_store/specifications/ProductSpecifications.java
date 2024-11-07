package com.claudia.virtual_store.specifications;

import com.claudia.virtual_store.entities.DigitalProduct;
import com.claudia.virtual_store.entities.PhysicalProduct;
import com.claudia.virtual_store.entities.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {

    public static Specification<Product> hasSearch(String search) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + search + "%"),
                        criteriaBuilder.like(root.get("code"), "%" + search + "%")
                );
    }

    public static Specification<Product> hasType(String type) {
        return (root, query, criteriaBuilder) -> {
            if ("DIGITAL".equalsIgnoreCase(type)) {
                return criteriaBuilder.equal(root.type(), DigitalProduct.class);
            } else if ("PHYSICAL".equalsIgnoreCase(type)) {
                return criteriaBuilder.equal(root.type(), PhysicalProduct.class);
            } else {
                return criteriaBuilder.conjunction();
            }
        };
    }

}
