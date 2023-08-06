class KrogerooItem {
  constructor(product, item) {
    this.productId = item.productId;
    this.quantity = item.quantity;
    this.lastAdded = item.lastAdded;
    this.isFavorite = item.isFavorite;
    this.name = product.name;
    this.aisleLocation = product.aisleLocation;
    this.brand = product.brand;
    this.categories = product.categories;
    this.imageUrl = product.imageUrl;
    this.isCurbside = product.isCurbside;
    this.isDelivery = product.isDelivery;
    this.isInStore = product.isInStore;
    this.isShipToHome = product.isShipToHome;
    this.regularPrice = product.regularPrice;
    this.salePrice = product.salePrice;
    this.size = product.size;
  }
}

export default KrogerooItem;
