package cput.ac.za.ecommerce.domain;
/*ShipmentTracking.java
  Sinazo Ntsimbi (222765208)
  Date: 19 June 2026
 */
import java.time.LocalDateTime;

public class ShipmentTracking {

    private String trackingId;
    private String deliveryId;
    private String location;
    private String status;
    private LocalDateTime timestamp;

    private ShipmentTracking() {}

    private ShipmentTracking(Builder b) {
        this.trackingId = b.trackingId;
        this.deliveryId = b.deliveryId;
        this.location = b.location;
        this.status = b.status;
        this.timestamp = b.timestamp;
    }

    public String getTrackingId() { return trackingId; }
    public String getDeliveryId() { return deliveryId; }
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public static class Builder {
        private String trackingId;
        private String deliveryId;
        private String location;
        private String status;
        private LocalDateTime timestamp;

        public Builder trackingId(String v) { this.trackingId = v; return this; }
        public Builder deliveryId(String v) { this.deliveryId = v; return this; }
        public Builder location(String v) { this.location = v; return this; }
        public Builder status(String v) { this.status = v; return this; }
        public Builder timestamp(LocalDateTime v) { this.timestamp = v; return this; }

        public ShipmentTracking build() {
            return new ShipmentTracking(this);
        }
    }
}
