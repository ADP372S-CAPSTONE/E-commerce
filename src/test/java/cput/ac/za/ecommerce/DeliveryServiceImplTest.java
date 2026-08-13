package cput.ac.za.ecommerce;

/*
 DeliveryServiceImplTest.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 27 July 2026
 */


import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.factory.DeliveryFactory;
import cput.ac.za.ecommerce.service.IDeliveryService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DeliveryServiceImplTest {

    @Autowired
    private IDeliveryService service;

    private static Delivery delivery;

    @BeforeAll
    static void setUp() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        delivery = DeliveryFactory.createDelivery(
                "D001",
                "O001",
                "TRK001",
                "Pending",
                address
        );
    }

    @Test
    @Order(1)
    void create() {

        Delivery created = service.create(delivery);

        assertNotNull(created);
        assertEquals(delivery.getDeliveryId(), created.getDeliveryId());

        System.out.println(created);
    }

    @Test
    @Order(2)
    void read() {

        Delivery read = service.read(delivery.getDeliveryId());

        assertNotNull(read);
        assertEquals(delivery.getDeliveryId(), read.getDeliveryId());

        System.out.println(read);
    }

    @Test
    @Order(3)
    void update() {

        Delivery updated = new Delivery.Builder()
                .copy(delivery)
                .setDeliveryStatus("Delivered")
                .build();

        Delivery result = service.update(updated);

        assertNotNull(result);
        assertEquals("Delivered", result.getDeliveryStatus());

        delivery = result;

        System.out.println(result);
    }

    @Test
    @Order(4)
    void getAll() {

        List<Delivery> deliveries = service.getAll();

        assertNotNull(deliveries);
        assertFalse(deliveries.isEmpty());

        System.out.println(deliveries);
    }

    @Test
    @Order(5)
    void delete() {

        boolean deleted = service.delete(delivery.getDeliveryId());

        assertTrue(deleted);
    }
}

