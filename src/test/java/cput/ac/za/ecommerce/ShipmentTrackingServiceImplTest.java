package cput.ac.za.ecommerce;
/*
 ShipmentTrackingServiceImplTest.java
 Author: Sinazo Ntsimbi (222765208)
 Date: 27 July 2026
 */

import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.domain.ShipmentTracking;
import cput.ac.za.ecommerce.factory.DeliveryFactory;
import cput.ac.za.ecommerce.factory.ShipmentTrackingFactory;
import cput.ac.za.ecommerce.service.IShipmentTrackingService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ShipmentTrackingServiceImplTest {

    @Autowired
    private IShipmentTrackingService service;

    private static ShipmentTracking tracking;

    @BeforeAll
    static void setUp() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        Delivery delivery = DeliveryFactory.createDelivery(
                "D001",
                "O001",
                "TRK001",
                "Pending",
                address
        );

        tracking = ShipmentTrackingFactory.createShipmentTracking(
                "S001",
                "Cape Town",
                "Package received",
                LocalDateTime.now(),
                delivery
        );
    }

    @Test
    @Order(1)
    void create() {

        ShipmentTracking created = service.create(tracking);

        assertNotNull(created);
        assertEquals(tracking.getTrackingId(), created.getTrackingId());

        System.out.println(created);
    }

    @Test
    @Order(2)
    void read() {

        ShipmentTracking read = service.read(tracking.getTrackingId());

        assertNotNull(read);
        assertEquals(tracking.getTrackingId(), read.getTrackingId());

        System.out.println(read);
    }

    @Test
    @Order(3)
    void update() {

        ShipmentTracking updated = new ShipmentTracking.Builder()
                .copy(tracking)
                .setStatusUpdate("Out for Delivery")
                .build();

        ShipmentTracking result = service.update(updated);

        assertNotNull(result);
        assertEquals("Out for Delivery", result.getStatusUpdate());

        tracking = result;

        System.out.println(result);
    }

    @Test
    @Order(4)
    void getAll() {

        List<ShipmentTracking> trackingList = service.getAll();

        assertNotNull(trackingList);
        assertFalse(trackingList.isEmpty());

        System.out.println(trackingList);
    }

    @Test
    @Order(5)
    void delete() {

        boolean deleted = service.delete(tracking.getTrackingId());

        assertTrue(deleted);
    }
}
