import getProductsByIds from "../services/kroger/products/getProductsByIds";
import KrogerooItem from "./krogerooItem";

class KrogerooList {
  constructor({ listId, listName, locationId, address, chain, krogerooItems }) {
    this.listId = listId;
    this.listName = listName;
    this.locationId = locationId;
    this.address = address;
    this.chain = chain;
    this.krogerooItems = krogerooItems;
  }

  static async createFromDbList({ dbList }) {
    try {
      const { listId, listName, locationId, address, chain, dbItems } = dbList;
      if (!dbItems.length) return { krogerooList: null, error: null };
      const productIds = dbItems.map((dbItem) => dbItem.productId);
      const { products, error } = await getProductsByIds({
        productIds,
        locationId: locationId,
      });
      if (error) throw error;
      const krogerooItems = products.map(
        (product) =>
          new KrogerooItem(
            product,
            dbItems.find((dbItem) => dbItem.productId === product.productId)
          )
      );
      const krogerooList = new KrogerooList({
        listId,
        listName,
        locationId,
        address,
        chain,
        krogerooItems,
      });
      return { krogerooList, error: null };
    } catch (error) {
      return { krogerooList: null, error };
    }
  }
}

export default KrogerooList;
