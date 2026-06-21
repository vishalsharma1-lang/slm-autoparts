package com.slm.controller;

import com.slm.entity.Category;
import com.slm.entity.Product;
import com.slm.repository.CategoryRepository;
import com.slm.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final CategoryRepository categoryRepo;

    @GetMapping
    public List<Product> getAll(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "false") boolean featured,
            @RequestParam(defaultValue = "false") boolean admin) {

        if (q != null && !q.isBlank()) return service.search(q);
        if (featured) return service.getFeatured();
        if (categoryId != null) return service.getByCategory(categoryId);
        return admin ? service.getAllAdmin() : service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        try {
            Product p = buildProduct(null, body);
            return ResponseEntity.ok(service.save(p));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return service.getById(id).map(existing -> {
            try {
                Product p = buildProduct(id, body);
                return ResponseEntity.ok(service.save(p));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Product buildProduct(Long id, Map<String, Object> body) {
        Long categoryId = Long.parseLong(body.get("categoryId").toString());
        Category cat = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product p = Product.builder()
                .category(cat)
                .name((String) body.get("name"))
                .slug((String) body.getOrDefault("slug", null))
                .description((String) body.getOrDefault("description", null))
                .price(new java.math.BigDecimal(body.get("price").toString()))
                .weight((String) body.getOrDefault("weight", null))
                .imageUrl((String) body.getOrDefault("imageUrl", null))
                .isActive(Boolean.parseBoolean(body.getOrDefault("isActive", "true").toString()))
                .isVeg(Boolean.parseBoolean(body.getOrDefault("isVeg", "true").toString()))
                .isFeatured(Boolean.parseBoolean(body.getOrDefault("isFeatured", "false").toString()))
                .stock(Integer.parseInt(body.getOrDefault("stock", "100").toString()))
                .tags((String) body.getOrDefault("tags", null))
                .build();

        if (id != null) p.setId(id);
        return p;
    }
}
