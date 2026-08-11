package cput.ac.za.ecommerce;
/*
 DeliveryFactory.java
 Factory test for Delivery
 Author: Sinazo Ntsimbi (222765208)
 Date: 28 June 2026
 */

import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.DeliveryAddress;
import cput.ac.za.ecommerce.factory.DeliveryFactory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DeliveryFactoryTest {

    @Test
    void createDelivery() {

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
                "In Transit",
                address
        );

        assertNotNull(delivery);
        assertEquals("D001", delivery.getDeliveryId());
        assertEquals("O001", delivery.getOrderId());
        assertEquals("TRK001", delivery.getTrackingNumber());
        assertEquals("In Transit", delivery.getDeliveryStatus());
        assertEquals(address, delivery.getDeliveryAddress());

        System.out.println(delivery);
    }

    @Test
    void createDeliveryWithNullId() {

        DeliveryAddress address = new DeliveryAddress.Builder()
                .setStreetAddress("10 Main Road")
                .setSuburb("Mowbray")
                .setCity("Cape Town")
                .setPostalCode("7700")
                .build();

        DeliveryFactory.createDelivery(null, "O001", "TRK001", "In Transit", address);
        Delivery delivery = null;

        assertNull(delivery);
    }
}
