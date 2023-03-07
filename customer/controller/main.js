getProducts();
const cart = getProductsInCart();
renderCartModal();

function getProducts(searchValue) {
  apiGetProducts(searchValue).then((response) => {
    const value = getElement(".type").value;
    let type;
    switch (value) {
      case "apple":
        {
          type = "Apple";
        }
        break;
      case "samsung":
        {
          type = "Samsung";
        }
        break;
      default:
        type = "";
    }

    const products = response.data
      .filter((product) => (type && product.type === type) || !type)
      .map((product) => {
        return new Product(
          product.id,
          product.name,
          product.img,
          product.price
        );
      });

    renderProducts(products);
  });
}
function renderProducts(products) {
  const html = products.reduce((result, product) => {
    return (
      result +
      `
        <div class="col-12 col-md-6 col-xl-4 col-lg-4 fa-money-bill-alt4 mb-4">
        <div class="card">
          <div class="product-item">
            <img
              src=${product.img}
            />
            <div class="text ml-3">
              <div class="text-title1">
                <span>${product.name}</span>
              </div>
              <div class="text-price-1">
                <span>$${product.price}</span>
              </div>
            </div>
            <div class="text2 d-flex justify-content-between ml-3 ">
              <div class="star-rate">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="btn-add-cart mr-4">

              <button onclick="addProductToCart('${product.id}','${product.name}','${product.price}','${product.img}')" class="button-cart"> <i class="fa-solid fa-cart-shopping"></i
              ><span>add cart</span></button>
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      `
    );
  }, "");
  getElement("#product").innerHTML = html;
}

function renderCartModal() {
  let html = cart.arrayItems.reduce((result, item, index) => {
    return (
      result +
      `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>
                    <img style='width:50px; height: 50px;' src='${
                      item.img
                    }' alt='${item.img}'/>
                </td>
                <td>
                  <div style="display: flex; align-items: center">
                    <button type='button' class='btn decrease' onclick="decreaseQuantity('${
                      item.id
                    }')">-</button>
                    ${item.quantity}
                    <button type='button' class='btn increase' onclick="increaseQuantity('${
                      item.id
                    }')">+</button>
                  </div>
                </td>
                <td>$${item.price}</td>
                <td>$${(item.quantity * item.price).toLocaleString()}</td>
                <td>
                    <button class='btn btn-danger' onclick="removeProduct('${
                      item.id
                    }')">Remove</button>
                </td>
            </tr>
        `
    );
  }, "");
  getElement("#listItem").innerHTML = html;

  const subTotal = cart.getTotalPayment();
  const tax = 5 * cart.getTotalQuantity();
  getElement("#totalPayment").innerHTML = `
        <tr>
            <th class='text-end' colspan='5'>Subtotal: </th>
            <td>$${subTotal.toLocaleString()}</td>
        </tr>
        <tr>
            <th class='text-end' colspan='5'>Tax: </th>
            <td scope='col'>$${tax}</td>
        </tr>
        <tr>
            <th class='text-end' colspan='5'>
                <i class="fa fa-arrow-right"></i> Total: 
            </th>
            <td scope='col'>$${(subTotal + tax).toLocaleString()}</td>
        </tr>
    `;

  getElement(".totalQuantity").innerHTML = cart.getTotalQuantity().toString();
}

function addProductToCart(productId, productName, productPrice, productImg) {
  cart.addItem(productId, productName, productPrice, productImg);

  storeProductsInCart();
  renderCartModal();
}

function removeProduct(itemId) {
  let index = cart.findIndex(itemId);
  if (index === -1) return;

  cart.arrayItems.splice(index, 1);

  storeProductsInCart();
  renderCartModal();
}

function decreaseQuantity(itemId) {
  let index = cart.findIndex(itemId);

  if (index === -1) return;

  if (cart.arrayItems[index].quantity === 1) {
    cart.arrayItems.splice(index, 1);
  } else {
    cart.arrayItems[index].quantity -= 1;
  }

  storeProductsInCart();
  renderCartModal();
}

function increaseQuantity(itemId) {
  let index = cart.findIndex(itemId);

  if (index === -1) return;

  cart.arrayItems[index].quantity += 1;

  storeProductsInCart();
  renderCartModal();
}

getElement("#emptyCart").onclick = () => {
  cart.arrayItems = [];
  storeProductsInCart();
  renderCartModal();
};

getElement("#payment").onclick = () => {
  if (!cart.arrayItems.length) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your cart is empty!",
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your order is done !",
    });
    cart.arrayItems = [];
    storeProductsInCart();
    renderCartModal();
  }
};

function getProductsInCart() {
  const json = localStorage.getItem("cart");
  if (!json) return new Cart([]);

  let cart = JSON.parse(json);
  cart = new Cart(cart.arrayItems);

  return cart;
}

function storeProductsInCart() {
  const json = JSON.stringify(cart);
  localStorage.setItem("cart", json);
}

function getElement(selector) {
  return document.querySelector(selector);
}
