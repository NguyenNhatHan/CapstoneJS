const URL = "https://63ecba1931ef61473b27eb9e.mockapi.io/AIP/products";

function apiGetProducts(searchValue) {
  return axios({
    method: "GET",
    url: URL,
    params: {
      type: searchValue || undefined,
    },
  });
}
