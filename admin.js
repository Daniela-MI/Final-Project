import {
  postNewProduct,
  getAllProducts,
  deleteProductById,
} from "./products.js";
import { showConfirmationMessage } from "./utils.js";

const imageInputElement = document.querySelector(".add-product-form #image");
const nameInputElement = document.querySelector(".add-product-form #name");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const priceInputElement = document.querySelector(".add-product-form #price");
const stockInputElement = document.querySelector(".add-product-form #stock");
// const searchParamString = window.location.search;
// const searchParams = new URLSearchParams(searchParamString);
// const productId = searchParams.get("productId");
const populateProductsTable = async () => {
  const products = await getAllProducts();
  // console.log(products);

  const tableContent = products
    .map(
      (product, index) =>
        `<tr>
        <th scope="row">${index + 1}</th>
        <td><img src="${product.imgURL}" width="50" height="50"></td>
        <td>${product.name}</td>
        <td>${product.price} Ron</td>
        <td>${product.stock}</td>
        <td>
          <button id="${product.id}" class="btn btn-danger">
            <i class="fa-regular fa-trash-can"></i>
          </button>
          <button class="btn btn-warning">
          <i class="fa-solid fa-pen"></i> </button>
        </td>
      </tr>`
    )
    .join("");

  document.getElementById("products-table-body").innerHTML = tableContent;
};

window.addEventListener("DOMContentLoaded", populateProductsTable);

const addProduct = async () => {
  const product = {
    image: imageInputElement.value,
    name: nameInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    stock: stockInputElement.value,
  };
  const response = await postNewProduct(product);
  //  INLOCUIT DE LINIILE 1-4 DIN UTILS.JS
  //   if (response.ok === false) {
  //     document.querySelector(".add-product-message").innerHTML =
  //       "ERROR! - DE MODIFICAT MESAJUL";
  //   } else {
  //     document.querySelector(".add-product-message").innerHTML =
  //       "PRODUCT SUCCESSFULLY ADDED - DE MODIFICAT MESAJUL";
  //     document.querySelector(".add-product-message").classList.toggle("hidden");

  showConfirmationMessage(
    "add-product-message",
    response,
    "The product has been successfully added!"
  );
};

document.getElementById("add-product").addEventListener("click", addProduct);

document.getElementById("add-new-product").addEventListener("click", () => {
  document.querySelector(".add-product-container").classList.toggle("hidden");
});

// // edit cart

// const showtableContent = async () => {
//   // Show product
//   if (productId) {
//     const result = await fetch(
//       `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/${productId}`
//     );
//     product = await result.json();
//   }
//   document.querySelector(".tableContent").innerHTML = showtableContent(product);

//   // Event listener for edit book button
//   document.querySelector(".btn-warning").addEventListener("click", editProduct);
// };
// window.addEventListener("DOMContentLoaded", showtableContent);

// const editProduct = async () => {
//   let response = await fetch(`${productURL}/${productId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       image: document.querySelector("#inputImage").value,
//       name: document.querySelector("#inputName").value,
//       description: document.querySelector("#inputDescription").value,
//       price: document.querySelector("#inputPrice").value,
//       stock: document.querySelector("#inputStock").value,
//     }),
//   });
//   let data = await response.json();
//   console.log(data);
// };

// // edit card end

const handleProducts = async (event) => {
  if (event.target.classList.contains("fa-trash-can")) {
    console.log("suntem pe butonul de delete");
    const productId = event.target.parentNode.id;
    const response = await deleteProductById(productId);
    if (response.ok) {
      await populateProductsTable();
    }
  }
};

document
  .getElementById("products-list")
  .addEventListener("click", handleProducts);
