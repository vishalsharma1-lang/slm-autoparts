package com.slm.service;

import com.slm.entity.Category;
import com.slm.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repo;

    public List<Category> getActive() {
        return repo.findByIsActiveTrueOrderByDisplayOrderAsc();
    }

    public List<Category> getAll() {
        return repo.findAll();
    }

    public Optional<Category> getById(Long id) {
        return repo.findById(id);
    }

    public Category save(Category c) {
        if (c.getSlug() == null || c.getSlug().isBlank()) {
            c.setSlug(toSlug(c.getName()));
        }
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private String toSlug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }
}
