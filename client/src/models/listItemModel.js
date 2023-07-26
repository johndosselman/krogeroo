class ListItem {
  constructor(data) {
    this.productId = data.product.id;
    this.quantity = data.quantity;
    this.lastAdded = data.product.user_product[0].last_added;
    this.isFavorite = data.product.user_product[0].is_favorite;
  }
}

export default ListItem;
