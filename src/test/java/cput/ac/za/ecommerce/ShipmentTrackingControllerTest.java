package cput.ac.za.ecommerce;
/*
 ShipmentTrackingControllerTest.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 29 July 2026
 */


import cput.ac.za.ecommerce.controller.ShipmentTrackingController;
import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.domain.ShipmentTracking;
import cput.ac.za.ecommerce.factory.DeliveryFactory;
import cput.ac.za.ecommerce.factory.ShipmentTrackingFactory;
import cput.ac.za.ecommerce.service.IShipmentTrackingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
        import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ShipmentTrackingControllerTest {

    @Mock
    private IShipmentTrackingService service;

    @InjectMocks
    private ShipmentTrackingController controller;

    private ShipmentTracking createTestTracking() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        Delivery delivery = DeliveryFactory.createDelivery(
                "DEL001",
                "ORD001",
                "TRK001",
                "In Transit",
                address
        );

        return ShipmentTrackingFactory.createShipmentTracking(
                "ST001",
                "Cape Town",
                "Package dispatched",
                LocalDateTime.now(),
                delivery
        );
    }

    @Test
    void testSave() {

        ShipmentTracking tracking = createTestTracking();

        when(service.create(tracking)).thenReturn(tracking);

        ShipmentTracking result = controller.save(tracking);

        assertNotNull(result);
        verify(service).create(tracking);
    }

    @Test
    void testGetById() {

        ShipmentTracking tracking = createTestTracking();

        when(service.read("ST001")).thenReturn(tracking);

        ShipmentTracking result = controller.getById("ST001");

        assertNotNull(result);
        verify(service).read("ST001");
    }

    @Test
    void testGetById_NotFound() {

        when(service.read("INVALID")).thenReturn(null);

        ShipmentTracking result = controller.getById("INVALID");

        assertNull(result);
        verify(service).read("INVALID");
    }

    @Test
    void testGetAll() {

        when(service.getAll()).thenReturn(List.of());

        List<ShipmentTracking> result = controller.getAll();

        assertNotNull(result);
        verify(service).getAll();
    }

    @Test
    void testUpdate() {

        ShipmentTracking tracking = createTestTracking();

        when(service.update(tracking)).thenReturn(tracking);

        ShipmentTracking result = controller.update(tracking);

        assertNotNull(result);
        verify(service).update(tracking);
    }

    @Test
    void testDelete() {

        controller.delete("ST001");

        verify(service).delete("ST001");
    }
}
