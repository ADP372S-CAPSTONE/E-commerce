package cput.ac.za.ecommerce.factory;

/*
 ShipmentTrackingFactory.java
 Factory for ShipmentTracking
 Author: Sinazo Ntsimbi (222765208)
 Date: 27 June 2026
 */

import cput.ac.za.ecommerce.domain.Delivery;
import cput.ac.za.ecommerce.domain.ShipmentTracking;

import java.time.LocalDateTime;

public class ShipmentTrackingFactory {

    public static ShipmentTracking createShipmentTracking(
            String trackingId,
            String currentLocation,
            String statusUpdate,
            LocalDateTime updateTimestamp,
            Delivery delivery) {

        if (trackingId == null || trackingId.isEmpty()
                || currentLocation == null || currentLocation.isEmpty()
                || statusUpdate == null || statusUpdate.isEmpty()
                || updateTimestamp == null
                || delivery == null) {
            return null;
        }

        return new ShipmentTracking.Builder()
                .setTrackingId(trackingId)
                .setCurrentLocation(currentLocation)
                .setStatusUpdate(statusUpdate)
                .setUpdateTimestamp(updateTimestamp)
                .setDelivery(delivery)
                .build();
    }
}
