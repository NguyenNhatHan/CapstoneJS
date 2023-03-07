// gửi yêu cầu lấy danh sách sản phẩm từ API

getProducts()

function getProducts(searchValue) {
  apiGetProduct(searchValue)
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
        <button class= "btn btn-primary" style = "background-color: #f0b80f;"
         data-toggle="modal"
         data-target="#exampleModal"
         onclick = "selectProduct('${products.id}')">
         Cập nhật 
         </button>
        <button class= "btn btn-danger" style = "background-color: #e7380c;
      }" 
        onclick="deleteProduct('${products.id}')" >Xóa</button>
      </td>
    </tr>
  `
    );
  }, "");

  document.getElementById("tablePhone").innerHTML = html;
}


  // Hàm thêm sản phẩm và gửi yêu cầu
function createProduct()   {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    img: getElement("#img").value,
    description: getElement("#desc").value,
    type: getElement("#type").value
  };
  let isValid = validate()
  if (!isValid) {
    return;
  }
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
   resetForm()
   $('#exampleModal').modal('hide')
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
      getElement("#header-title").innerHTML = "Update Phone";
      getElement("#modal-footer").innerHTML = `
        <button class="btn btn-primary" data-dismiss="modal" style = "background-color: #f0b80f;" onclick="updateProduct('${product.id}')">Update Phone</button>
        <button class="btn btn-secondary" data-dismiss="modal"> Close</button>
      `;
      $("#myModal").modal("show");
    }).catch(error => {
      alert("Lấy chi tiết sản phẩm thất bại ")
    })
}

// Hàm cập nhật 
function updateProduct(productId) {
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
    }).catch((error) => {
      alert("Cập nhật sản phẩm thất bại")
    })

  resetForm()
}

// Hàm Sort 
function sortJSON(arr, key, asc = true) {
  return arr.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    if (asc) {
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}

// hàm sắp xếp giảm
function arrangeProduct(searchValue){
  apiGetProduct(searchValue).then((response) => {
    let sortList = sortJSON(response.data, "price", true);
    renderProducts(sortList)
  }).catch((error) => {
    alert("API get products error")
  })
}
function arrangeProduct2(searchValue) {
  apiGetProduct(searchValue).then((response) => {
    let sortList = sortJSON(response.data, "price", false);
    renderProducts(sortList)
  }).catch((error) => {
    alert("API get products error")
  })
}


// Reset các giá trị của input
function resetForm() {
  getElement("#name").value = ""
  getElement("#price").value = ""
  getElement("#img").value = ""
  getElement("#desc").value = ""
  getElement("#type").value = ""
}

// Hàm validate
function validate() {
  let isValidate = true;
  // ktra tên
  let name = getElement("#name").value;
  if (!name.trim()) {
    isValidate = false;
    getElement("#tbname").innerHTML = " (*)This field can't be empty"
    getElement("#tbname").style.display = "block";
  } else {
    getElement("#tbname").innerHTML = "";
  }
  // kiểm tra giá
  let price = getElement("#price").value;
  if (!price.trim()) {
    isValidate = false;
    getElement("#tbprice").innerHTML = " (*)This field can't be empty"
    getElement("#tbprice").style.display = "block";
  }else if (!/^[0-9]*$/.test(price)) {
    isValidate = false;
    getElement("#tbprice").innerHTML = "The price must be a number"
   }else {
    getElement("#tbprice").innerHTML = "";
  }

  // kiểm tra img
  let img = getElement("#img").value;
  if (!img.trim()) {
    isValidate = false;
    getElement("#tbimg").innerHTML = " (*)This field can't be empty"
    getElement("#tbimg").style.display = "block";
  } else {
    getElement("#tbimg").innerHTML = "";
  }
  // kiểm tra des
  let des = getElement("#desc").value;
  if (!des.trim()) {
    isValidate = false;
    getElement("#tbdesc").innerHTML = " (*)This field can't be empty"
    getElement("#tbdesc").style.display = "block";
  } else {
    getElement("#tbdesc").innerHTML = "";
  }
  // kiểm tra type
  let type = getElement("#type").value;
  if (!type.trim()) {
    isValidate = false;
    getElement("#tbtype").innerHTML = " (*)This field can't be empty"
    getElement("#tbtype").style.display = "block";
  } else {
    getElement("#tbtype").innerHTML = "";
  }
  return isValidate;
}
// Helpers
function getElement(selector) {
  return document.querySelector(selector);
}


// ============ DOM ===============
getElement("#btnThemSP").addEventListener("click", () => {
  getElement("#header-title").innerHTML = "Phone Management";
  getElement("#modal-footer").innerHTML = `
  <button class="btn btn-primary" onclick="createProduct()" style = "background-color: #f0b80f;">Add Phone</button>
    <button class="btn btn-secondary" data-dismiss="modal" >Close</button>
  `;
  resetForm()
});

getElement("#txtsearch").addEventListener("input", (event) => {

  // if (event.key !== "Enter") return;
  const searchValue = event.target.value;
  getProducts(searchValue)
})