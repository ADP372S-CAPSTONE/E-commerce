package cput.ac.za.ecommerce;
/*
 ShipmentTrackingControllerTest.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 29 July 2026
 */

import cput.ac.za.ecommerce.controller.DeliveryController;
import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.factory.DeliveryFactory;
import cput.ac.za.ecommerce.service.IDeliveryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DeliveryControllerTest {

    @Mock
    private IDeliveryService service;

    @InjectMocks
    private DeliveryController controller;

    private Delivery createTestDelivery() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        return DeliveryFactory.createDelivery(
                "DEL001",
                "ORD001",
                "TRK001",
                "Pending",
                address
        );
    }

    @Test
    void testSave() {

        Delivery delivery = createTestDelivery();

        when(service.create(delivery)).thenReturn(delivery);

        Delivery result = controller.save(delivery);

        assertNotNull(result);
        verify(service).create(delivery);
    }

    @Test
    void testGetById() {

        Delivery delivery = createTestDelivery();

        when(service.read("DEL001")).thenReturn(delivery);

        Delivery result = controller.getById("DEL001");

        assertNotNull(result);
        verify(service).read("DEL001");
    }

    @Test
    void testGetById_NotFound() {

        when(service.read("INVALID")).thenReturn(null);

        Delivery result = controller.getById("INVALID");

        assertNull(result);
        verify(service).read("INVALID");
    }

    @Test
    void testGetAll() {

        when(service.getAll()).thenReturn(List.of());

        List<Delivery> result = controller.getAll();

        assertNotNull(result);
        verify(service).getAll();
    }

    @Test
    void testUpdate() {

        Delivery delivery = createTestDelivery();

        when(service.update(delivery)).thenReturn(delivery);

        Delivery result = controller.update(delivery);

        assertNotNull(result);
        verify(service).update(delivery);
    }

    @Test
    void testDelete() {

        controller.delete("DEL001");

        verify(service).delete("DEL001");
    }
}


