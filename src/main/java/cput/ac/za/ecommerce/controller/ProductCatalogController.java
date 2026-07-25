/* ProductCatalogController.java
        Controller for Product Catalog Service
        Author: Nomhle Njengele (216227488)
        Date: 24 July 2026 */

        package cput.ac.za.ecommerce.controller;

import cput.ac.za.ecommerce.domain.ProductCatalog;
import cput.ac.za.ecommerce.service.IProductCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productcatalog")
public class ProductCatalogController {

    private final IProductCatalogService service;

    @Autowired
    public ProductCatalogController(IProductCatalogService service) {
        this.service = service;
    }

    @PostMapping
    public ProductCatalog save(@RequestBody ProductCatalog productCatalog) {
        return service.saveProductCatalog(productCatalog);
    }

    @GetMapping("/{productId}")
    public ProductCatalog getById(@PathVariable String productId) {
        return service.getProductCatalogById(productId);
    }

    @GetMapping
    public List<ProductCatalog> getAll() {
        return service.getAllProductCatalogs();
    }

    @PutMapping
    public ProductCatalog update(@RequestBody ProductCatalog productCatalog) {
        return service.updateProductCatalog(productCatalog);
    }

    @DeleteMapping("/{productId}")
    public void delete(@PathVariable String productId) {
        service.deleteProductCatalog(productId);
    }
}
