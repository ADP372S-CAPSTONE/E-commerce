/* ProductCatalogRepository.java
   Repository for Product Catalog Service
   Author: Nomhle Njengele (216227488)
   Date: 12 July 2026 */

package cput.ac.za.ecommerce.repository;

import cput.ac.za.ecommerce.domain.ProductCatalog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCatalogRepository extends JpaRepository<ProductCatalog, String> {
    List<ProductCatalog> findByBrandName(String brandName);
    List<ProductCatalog> findByModelName(String modelName);
    List<ProductCatalog> findByStandardRetailPriceLessThan(double price);
}