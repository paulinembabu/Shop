export class Cart {
    public items: any = Array<any>();
    updateFrom(storedCart: Cart) {
      this.items = storedCart.items;
    }
}
