package com.slm.service;

import com.slm.entity.Order;
import com.slm.entity.OrderItem;
import com.slm.entity.Product;
import com.slm.repository.OrderRepository;
import com.slm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;

    @Transactional
    public Order placeOrder(OrderRequest req) {
        Order order = Order.builder()
                .customerName(req.customerName())
                .phone(req.phone())
                .address(req.address())
                .city(req.city())
                .pincode(req.pincode())
                .notes(req.notes())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (OrderRequest.ItemDto item : req.items()) {
            Product p = productRepo.findById(item.productId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.productId()));

            OrderItem oi = OrderItem.builder()
                    .order(order)
                    .productId(p.getId())
                    .productName(p.getName())
                    .productImage(p.getImageUrl())
                    .quantity(item.quantity())
                    .unitPrice(p.getPrice())
                    .build();

            order.getItems().add(oi);
            total = total.add(p.getPrice().multiply(BigDecimal.valueOf(item.quantity())));
        }

        order.setTotalAmount(total);
        return orderRepo.save(order);
    }

    public List<Order> getAll() {
        return orderRepo.findAllByOrderByCreatedAtDesc();
    }

    public List<Order> getByPhone(String phone) {
        return orderRepo.findByPhoneOrderByCreatedAtDesc(phone);
    }

    public Optional<Order> getById(Long id) {
        return orderRepo.findById(id);
    }

    public Order updateStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        order.setStatus(status);
        return orderRepo.save(order);
    }

    public record OrderRequest(
            String customerName,
            String phone,
            String address,
            String city,
            String pincode,
            String notes,
            List<ItemDto> items
    ) {
        public record ItemDto(Long productId, int quantity) {}
    }
}
