const URL = "https://63ecba1931ef61473b27eb9e.mockapi.io/AIP/products"

function apiGetProduct(searchValue){
    return axios({
        method: "GET",
        url: URL,
        params: {
            name: searchValue || undefined,
        },
      })
}
  
function apiPostProduct(product){
    return axios({
        method: "POST",
        url: URL,
        data: product,
      })
}

function apiDeleteProduct(productId){
    return axios ({
        method: "DELETE",
        url: `${URL}/${productId}`,
    });
}

function apiGetProductById(productId){
    return axios ({
        method: "GET",
        url: `${URL}/${productId}`,
    });
}

function apiUpdateProduct(productId,product){
    return axios ({
        method: "PUT",
        url: `${URL}/${productId}`,
        data: product,
    });
}