package com.claudia.virtual_store.services;

import com.claudia.virtual_store.dto.CreateDigitalProduct;
import com.claudia.virtual_store.dto.CreatePhysicalProduct;
import com.claudia.virtual_store.entities.DigitalProduct;
import com.claudia.virtual_store.entities.PhysicalProduct;
import com.claudia.virtual_store.entities.Product;
import com.claudia.virtual_store.repositories.ProductRepository;
import com.claudia.virtual_store.exceptions.ResourceNotFoundException;
import com.claudia.virtual_store.specifications.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findAllWithFilters(String search, String type, int page, int size, String sort, String order) {
        Pageable pageable;

        String field = sort;
        if (StringUtils.hasText(field)) {
            if (!field.equals("code") && !field.equals("name") && !field.equals("shippingCost") && !field.equals("productType") && !field.equals("downloadLink")) {
                throw new IllegalArgumentException("Illegal sorting field: " + field);
            }
        } else {
            field = "code";
        }

        boolean isAscending = "asc".equalsIgnoreCase(order);
        pageable = PageRequest.of(page, size, isAscending ? Sort.by(field).ascending() : Sort.by(field).descending());

        Specification<Product> spec = Specification.where(null);
        if (search != null) {
            spec = spec.and(ProductSpecifications.hasSearch(search));
        }
        if (type != null) {
            spec = spec.and(ProductSpecifications.hasType(type));
        }

        return productRepository.findAll(spec, pageable).getContent();
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public DigitalProduct saveDigitalProduct(CreateDigitalProduct createDigitalProduct) {
        DigitalProduct digitalProduct = new DigitalProduct();
        digitalProduct.setName(createDigitalProduct.getName());
        digitalProduct.setCode(createDigitalProduct.getCode());
        digitalProduct.setDownloadLink(createDigitalProduct.getDownloadLink());

        return productRepository.save(digitalProduct);
    }

    @Override
    public PhysicalProduct savePhysicalProduct(CreatePhysicalProduct createPhysicalProduct) {
        PhysicalProduct physicalProduct = new PhysicalProduct();
        physicalProduct.setName(createPhysicalProduct.getName());
        physicalProduct.setCode(createPhysicalProduct.getCode());
        physicalProduct.setShippingCost(createPhysicalProduct.getShippingCost());

        return productRepository.save(physicalProduct);
    }

    @Override
    public Product update(Long id, Product product) {
        Product existingProduct = findById(id);
        existingProduct.setName(product.getName());
        existingProduct.setCode(product.getCode());

        if (product instanceof DigitalProduct) {
            ((DigitalProduct) existingProduct).setDownloadLink(((DigitalProduct) product).getDownloadLink());
        } else if (product instanceof PhysicalProduct) {
            ((PhysicalProduct) existingProduct).setShippingCost(((PhysicalProduct) product).getShippingCost());
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public void delete(Long id) {
        Product product = findById(id);
        productRepository.delete(product);
    }
}