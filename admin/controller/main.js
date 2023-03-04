// gửi yêu cầu lấy danh sách sản phẩm từ API

getProducts()

function getProducts() {
  apiGetProduct()
    .then((response) => {

      const products = response.data.map((product) => {
        return new Product(
          product.id,
          product.name,
          product.price,
          product.img,
          product.description
        );
      });
      renderProducts(products);
    }).catch((error) => {
      alert("API get products error");
    })
}

// hiển thị danh sách ra table
function renderProducts(products) {
  let html = products.reduce((result, products, index) => {
    return (

      result +
      `
    <tr>
      <td>${index + 1}</td>
      <td>${products.name}</td>
      <td>${products.price}</td>
      <td>
        <img src = "${products.img}" width = "70"; height = "70" />
      </td>
      <td>${products.description}</td>
      <td>
        <button class= "btn btn-primary" style = "background-color: blue"
         data-toggle="modal"
         data-target="#exampleModal"
         onclick = "selectProduct('${products.id}')">
         Xem
         </button>
        <button class= "btn btn-danger" style = "background-color: red" 
        onclick="deleteProduct('${products.id}')" >Xóa</button>
      </td>
    </tr>
  `
    );
  }, "");

  document.getElementById("tablePhone").innerHTML = html;
}


// Hàm thêm sản phẩm và gửi yêu cầu
function createProduct() {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    img: getElement("#img").value,
    description: getElement("#desc").value,
    type: getElement("#type").value
  };

  // apiPostProduct()
   axios({
    method: "POST",
    url: URL,
    data: product,
   })
    .then((response) => {
      // sau khi thêm thành công, dư liệu chỉ thay đổi ở sever
      // cần gọi API lấy danh sách sản phẩm mới nhất và hiển thị ra giao diện
      getProducts();
    })
    .catch((error) => {
      alert("Thêm sản phẩm thất bại");
    })
}

// hàm xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      getProducts()
    })
    .catch((error) => {
      alert("Xóa sản phẩm thất bại")
    })
}

// Hàm lấy chi tiết và hiển thị lên modal
function selectProduct(productId) {
  apiGetProductById(productId)
    .then(response => {
      const product = response.data;
        getElement("#name").value = product.name;
        getElement("#price").value = product.price;
        getElement("#img").value = product.img;
        getElement("#desc").value = product.description;
        getElement("#type").value = product.type;

        // Mở và cập nhật giao diện cho modal
        getElement("#header-title").innerHTML = "Cập nhật sản phẩm";
        getElement("#modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
      `;
      $("#myModal").modal("show");
    }).catch(error => {
          alert("Lấy chi tiết sản phẩm thất bại ")
        })
}

// Hàm cập nhật 
function updateProduct(productId){
  console.log(productId);
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    img: getElement("#img").value,
    description: getElement("#desc").value,
    type: getElement("#type").value
  };

  apiUpdateProduct(productId, product)
    .then((response) => {
      getProducts()
    }).catch ((error) => {
      alert("Cập nhật sản phẩm thất bại")
    })
}

// Helpers
function getElement(selector) {
  return document.querySelector(selector);
}


// ============ DOM ===============
getElement("#btnThemSP").addEventListener("click", () => {
  getElement("#header-title").innerHTML = "Thêm sản phẩm";
  getElement("#modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
  `;
});