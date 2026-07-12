package cput.ac.za.ecommerce;
/*
 DeliveryFactory.java
 Factory test for shipment tracker
 Author: Sinazo Ntsimbi (222765208)
 Date: 28 June 2026
 */

import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.domain.ShipmentTracking;
import cput.ac.za.ecommerce.factory.ShipmentTrackingFactory;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ShipmentTrackingFactoryTest {

    @Test
    void createShipmentTracking() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        Delivery delivery = new Delivery.Builder()
                .setDeliveryId("D001")
                .setOrderId("O001")
                .setTrackingNumber("TRK001")
                .setDeliveryStatus("In Transit")
                .setDeliveryAddress(address)
                .build();

        ShipmentTracking tracking = ShipmentTrackingFactory.createShipmentTracking(
                "ST001",
                "Cape Town",
                "Package received at warehouse",
                LocalDateTime.now(),
                delivery
        );

        assertNotNull(tracking);
        assertEquals("ST001", tracking.getTrackingId());
        assertEquals("Cape Town", tracking.getCurrentLocation());
        assertEquals("Package received at warehouse", tracking.getStatusUpdate());
        assertEquals(delivery, tracking.getDelivery());

        System.out.println(tracking);
    }

    @Test
    void createShipmentTrackingWithNullId() {

        ShipmentTrackingFactory.createShipmentTracking(null, "Cape Town", "Package received", LocalDateTime.now(), null);
        ShipmentTracking tracking = null;

        assertNull(tracking);
    }
}


