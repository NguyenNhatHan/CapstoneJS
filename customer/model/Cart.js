class CartItem {
  constructor(id, name, price, img, quantity) {
    this.id = id;
  this.name = name;
  this.price = price;
  this.img = img;
  this.quantity = quantity;
  }
}

class Cart {
  constructor(arrayItems) {
    this.arrayItems = arrayItems;
  }

  findIndex(productId) {
    return this.arrayItems.findIndex((item) => item.id === productId);
  }

  addItem(productId, productName, productPrice, productImg) {
    let index = this.findIndex(productId);

    if (index === -1) {
      const newItem = new CartItem(
        productId,
        productName,
        productPrice,
        productImg,
        1
      );
      this.arrayItems.push(newItem);
    } else {
      let quantity = +this.arrayItems[index].quantity;

      quantity++;
      quantity.toString();

      this.arrayItems[index].quantity = quantity;
    }
  }

  getTotalQuantity() {
    return this.arrayItems.reduce((result, item) => {
      return (result += +item.quantity);
    }, 0);
  }

  getTotalPayment() {
    return this.arrayItems.reduce((result, item) => {
      return (result += +item.quantity * +item.price);
    }, 0);
  }
}
