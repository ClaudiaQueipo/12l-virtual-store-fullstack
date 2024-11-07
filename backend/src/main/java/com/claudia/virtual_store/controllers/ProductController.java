package com.claudia.virtual_store.controllers;

import com.claudia.virtual_store.dto.CreateDigitalProduct;
import com.claudia.virtual_store.dto.CreatePhysicalProduct;
import com.claudia.virtual_store.dto.UpdateProduct;
import com.claudia.virtual_store.entities.DigitalProduct;
import com.claudia.virtual_store.entities.PhysicalProduct;
import com.claudia.virtual_store.entities.Product;
import com.claudia.virtual_store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Retrieve all products with optional search and pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class)))
    })
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "code") String sort,
            @RequestParam(required = false) String order) {

        List<Product> products = productService.findAllWithFilters(search, type, page, size, sort, order);
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Retrieve a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @Operation(summary = "Create a new digital product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Digital product created",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = DigitalProduct.class)))
    })
    @PostMapping("/digital")
    public DigitalProduct createDigitalProduct(@RequestBody CreateDigitalProduct digitalProduct) {
        return productService.saveDigitalProduct(digitalProduct);
    }

    @Operation(summary = "Create a new physical product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Physical product created",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PhysicalProduct.class)))
    })
    @PostMapping("/physical")
    public PhysicalProduct createPhysicalProduct(@RequestBody CreatePhysicalProduct physicalProduct) {
        return productService.savePhysicalProduct(physicalProduct);
    }

    @Operation(summary = "Update an existing product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody UpdateProduct productDTO) {
        Product existingProduct = productService.findById(id);

        existingProduct.setName(productDTO.getName());
        existingProduct.setCode(productDTO.getCode());

        if (existingProduct instanceof DigitalProduct) {
            ((DigitalProduct) existingProduct).setDownloadLink(productDTO.getDownloadLink());
        } else if (existingProduct instanceof PhysicalProduct) {
            ((PhysicalProduct) existingProduct).setShippingCost(productDTO.getShippingCost());
        }

        return productService.save(existingProduct);
    }

    @Operation(summary = "Delete a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
