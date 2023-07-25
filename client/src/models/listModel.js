import getProductsByIds from "../services/kroger/products/getProductsByIds";
import ListItem from "./listItemModel";

class List {
  constructor(data) {
    this.listId = data.id;
    this.listName = data.name;
    this.locationId = data.location.id;
    this.address = data.location.address;
    this.chain = data.location.chain;
    this.items = data.item.map((obj) => new ListItem(obj));
  }
  async getProductsInfo() {
    const productIds = this.items.map((item) => item.productId);
    const { products, error } = await getProductsByIds({
      productIds,
      locationId: this.locationId,
    });
    this.items.forEach((item) => {
      const product = products.find((obj) => obj.productId === item.productId);
      if (product) {
        for (const property in product) {
          item[property] = product[property];
        }
      }
    });
    console.log(this.items);
    return { error };
  }
}

export default List;
