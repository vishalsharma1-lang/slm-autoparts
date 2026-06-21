package com.slm.service;

import com.slm.entity.Product;
import com.slm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;

    public List<Product> getAll() {
        return repo.findByIsActiveTrueOrderByNameAsc();
    }

    public List<Product> getAllAdmin() {
        return repo.findAll();
    }

    public List<Product> getByCategory(Long categoryId) {
        return repo.findByCategoryIdAndIsActiveTrueOrderByNameAsc(categoryId);
    }

    public List<Product> getFeatured() {
        return repo.findByIsActiveTrueAndIsFeaturedTrueOrderByNameAsc();
    }

    public List<Product> search(String q) {
        return repo.search(q);
    }

    public Optional<Product> getById(Long id) {
        return repo.findById(id);
    }

    public Optional<Product> getBySlug(String slug) {
        return repo.findBySlug(slug);
    }

    public Product save(Product p) {
        if (p.getSlug() == null || p.getSlug().isBlank()) {
            p.setSlug(toSlug(p.getName()));
        }
        return repo.save(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private String toSlug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }
}
