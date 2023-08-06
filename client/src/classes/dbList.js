import DbItem from "./dbItem";

class DbList {
  constructor(data) {
    this.listId = data.id;
    this.listName = data.name;
    this.locationId = data.location.id;
    this.address = data.location.address;
    this.chain = data.location.chain;
    this.dbItems = data.item.map((obj) => new DbItem(obj));
  }
}

export default DbList;
