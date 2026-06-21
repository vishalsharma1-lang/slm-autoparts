package com.slm.repository;

import com.slm.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIdAndIsActiveTrueOrderByNameAsc(Long categoryId);
    List<Product> findByIsActiveTrueAndIsFeaturedTrueOrderByNameAsc();
    List<Product> findByIsActiveTrueOrderByNameAsc();
    Optional<Product> findBySlug(String slug);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(p.tags) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<Product> search(String q);
}
