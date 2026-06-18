package cput.ac.za.ecommerce.domain;
/*Delivery.java
  Sinazo Ntsimbi (222765208)
  Date: 19 June 2026
 */


public class Delivery {

    private String deliveryId;
    private String orderId;
    private String trackingNumber;
    private String status;
    private DeliveryAddress address;

    private Delivery() {}

    private Delivery(Builder b) {
        this.deliveryId = b.deliveryId;
        this.orderId = b.orderId;
        this.trackingNumber = b.trackingNumber;
        this.status = b.status;
        this.address = b.address;
    }

    public String getDeliveryId() { return deliveryId; }
    public String getOrderId() { return orderId; }
    public String getTrackingNumber() { return trackingNumber; }
    public String getStatus() { return status; }
    public DeliveryAddress getAddress() { return address; }

    public static class Builder {
        private String deliveryId;
        private String orderId;
        private String trackingNumber;
        private String status;
        private DeliveryAddress address;

        public Builder deliveryId(String v) { this.deliveryId = v; return this; }
        public Builder orderId(String v) { this.orderId = v; return this; }
        public Builder trackingNumber(String v) { this.trackingNumber = v; return this; }
        public Builder status(String v) { this.status = v; return this; }
        public Builder address(DeliveryAddress v) { this.address = v; return this; }

        public Delivery build() {
            return new Delivery(this);
        }
    }
}




