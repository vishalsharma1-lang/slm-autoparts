package com.slm.service;

import com.slm.entity.Product;
import com.slm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;

    public Page<Product> getAll(int page, int size) {
        return repo.findByIsActiveTrueOrderByNameAsc(PageRequest.of(page, size));
    }

    public List<Product> getAllAdmin() {
        return repo.findAll();
    }

    public Page<Product> getByCategory(Long categoryId, int page, int size) {
        return repo.findByCategoryIdAndIsActiveTrueOrderByNameAsc(categoryId, PageRequest.of(page, size));
    }

    public List<Product> getFeatured() {
        return repo.findByIsActiveTrueAndIsFeaturedTrueOrderByNameAsc();
    }

    public Page<Product> search(String q, int page, int size) {
        return repo.search(q, PageRequest.of(page, size));
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
