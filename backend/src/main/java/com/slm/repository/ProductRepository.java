package com.slm.repository;

import com.slm.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByIsActiveTrueOrderByNameAsc(Pageable pageable);
    Page<Product> findByCategoryIdAndIsActiveTrueOrderByNameAsc(Long categoryId, Pageable pageable);
    List<Product> findByIsActiveTrueAndIsFeaturedTrueOrderByNameAsc();
    Optional<Product> findBySlug(String slug);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(p.tags) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<Product> search(String q, Pageable pageable);
}
