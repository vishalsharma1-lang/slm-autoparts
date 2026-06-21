package com.slm.controller;

import com.slm.entity.Order;
import com.slm.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<?> place(@RequestBody OrderService.OrderRequest req) {
        try {
            Order order = service.placeOrder(req);
            return ResponseEntity.ok(Map.of("orderId", order.getId(), "status", order.getStatus(), "total", order.getTotalAmount()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/track")
    public ResponseEntity<?> trackByPhone(@RequestParam String phone) {
        List<Order> orders = service.getByPhone(phone);
        if (orders.isEmpty()) return ResponseEntity.ok(List.of());
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    public List<Order> getAll() {
        return service.getAll();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            Order.OrderStatus status = Order.OrderStatus.valueOf(body.get("status"));
            return ResponseEntity.ok(service.updateStatus(id, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
