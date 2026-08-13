package cput.ac.za.ecommerce.controller;

/*
 DeliveryController.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 29 July 2026
 */

import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.service.IDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final IDeliveryService service;

    @Autowired
    public DeliveryController(IDeliveryService service) {
        this.service = service;
    }

    @PostMapping
    public Delivery save(@RequestBody Delivery delivery) {
        return service.create(delivery);
    }

    @GetMapping("/{deliveryId}")
    public Delivery getById(@PathVariable String deliveryId) {
        return service.read(deliveryId);
    }

    @GetMapping
    public List<Delivery> getAll() {
        return service.getAll();
    }

    @PutMapping
    public Delivery update(@RequestBody Delivery delivery) {
        return service.update(delivery);
    }

    @DeleteMapping("/{deliveryId}")
    public void delete(@PathVariable String deliveryId) {
        service.delete(deliveryId);
    }
}

