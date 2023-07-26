class Product {
  constructor(data) {
    this.productId = data.productId;
    this.name = data.description;
    this.aisleLocation =
      data.aisleLocations.length > 0
        ? data.aisleLocations[0].description
        : null;
    this.brand = data.brand;
    this.categories = data.categories;
    this.imageUrl =
      data.images
        .find((image) => image.featured)
        .sizes.find((obj) => obj.size === "medium").url ??
      data.images.find((image) => image.featured).sizes[0]?.url;
    this.isCurbside = data.items[0]?.fulfillment?.curbside;
    this.isDelivery = data.items[0]?.fulfillment?.delivery;
    this.isInStore = data.items[0]?.fulfillment?.inStore;
    this.isShipToHome = data.items[0]?.fulfillment?.shipToHome;
    this.regularPrice = data.items[0]?.price?.regular;
    this.salePrice = data.items[0]?.price?.promo;
    this.size = data.items[0]?.size;
  }
}

export default Product;
