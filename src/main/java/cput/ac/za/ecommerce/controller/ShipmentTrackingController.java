package cput.ac.za.ecommerce.controller;

/*
 ShipmentTrackingController.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 29 July 2026
 */

import cput.ac.za.ecommerce.domain.ShipmentTracking;
import cput.ac.za.ecommerce.service.IShipmentTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipmenttracking")
public class ShipmentTrackingController {

    private final IShipmentTrackingService service;

    @Autowired
    public ShipmentTrackingController(IShipmentTrackingService service) {
        this.service = service;
    }

    @PostMapping
    public ShipmentTracking save(@RequestBody ShipmentTracking shipmentTracking) {
        return service.create(shipmentTracking);
    }

    @GetMapping("/{trackingId}")
    public ShipmentTracking getById(@PathVariable String trackingId) {
        return service.read(trackingId);
    }

    @GetMapping
    public List<ShipmentTracking> getAll() {
        return service.getAll();
    }

    @PutMapping
    public ShipmentTracking update(@RequestBody ShipmentTracking shipmentTracking) {
        return service.update(shipmentTracking);
    }

    @DeleteMapping("/{trackingId}")
    public void delete(@PathVariable String trackingId) {
        service.delete(trackingId);
    }
}
