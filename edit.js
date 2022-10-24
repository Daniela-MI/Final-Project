const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("id");
const productURL = `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/`;
let product = {
  imgURL: "",
  name: "",
  description: "",
  price: "",
  stock: "",
};

const createForm = (product) => {
  return `<label>ImageUrl: </label>
            <input id="inputImage" type="text" value='${product.imgURL}'>
            <label>Name: </label>
            <input id="inputName" type="text" value='${product.name}'>
            <label>Description: </label>
            <textarea id="inputDescription" rows="4" cols="50">${product.description}</textarea>
            <label>Stock: </label>
            <input id="inputStock" type="number" value='${product.stock}'>

            </div>`;
};

const showForm = async () => {
  // Show product
  if (productId) {
    const result = await fetch(
      `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/${productId}`
    );
    product = await result.json();
  }
  document.querySelector(".form").innerHTML = createForm(product);

  // Event listener for edit product button

  document.querySelector(".btn-warning").addEventListener("click", editProduct);
};

window.addEventListener("DOMContentLoaded", showForm);

const editProduct = async () => {
  let response = await fetch(`${productURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imgURL: document.querySelector("#inputImgURL").value,
      name: document.querySelector("#inputName").value,
      description: document.querySelector("#inputDescription").value,
      price: document.querySelector("#inputPrice").value,
      stock: document.querySelector("#inputStock").value,
    }),
  });
  let data = await response.json();
  console.log(data);
};
