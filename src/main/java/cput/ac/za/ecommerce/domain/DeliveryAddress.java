package cput.ac.za.ecommerce.domain;
/*DeliveryAddress.java
  Sinazo Ntsimbi (222765208)
  Date: 19 June 2026
 */
public class DeliveryAddress {

    private String streetAddress;
    private String suburb;
    private String city;
    private String postalCode;

    private DeliveryAddress() {}

    private DeliveryAddress(Builder b) {
        this.streetAddress = b.streetAddress;
        this.suburb = b.suburb;
        this.city = b.city;
        this.postalCode = b.postalCode;
    }

    public String getStreetAddress() { return streetAddress; }
    public String getSuburb() { return suburb; }
    public String getCity() { return city; }
    public String getPostalCode() { return postalCode; }

    public static class Builder {
        private String streetAddress;
        private String suburb;
        private String city;
        private String postalCode;

        public Builder streetAddress(String v) { this.streetAddress = v; return this; }
        public Builder suburb(String v) { this.suburb = v; return this; }
        public Builder city(String v) { this.city = v; return this; }
        public Builder postalCode(String v) { this.postalCode = v; return this; }

        public DeliveryAddress build() {
            return new DeliveryAddress(this);
        }
    }
}