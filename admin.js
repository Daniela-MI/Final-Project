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
const idInputElement = document.querySelector(".add-product-form #id");

const populateProductsTable = async () => {
  const products = await getAllProducts();
  console.log(products);

  const tableContent = products
    .map(
      (product, index) =>
        `<tr>
    <th scope="row">${index + 1}</th>
    <td><img src="${product.imgURL}" width="50" height="50"></td>
    <td>${product.name}</td>
    <td>${product.price} Ron </td>
    <td>${product.stock} </td>
    <td>${product.id} </td>
    <td>
      <button id="${product.id}" class="btn btn-danger">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button class="btn btn-warning">
        <i class="fa-solid fa-pen"></i>
      </button>
    </td>
      </tr>`
    )
    .join("");

  document.getElementById("product-table-body").innerHTML = tableContent;
};

window.addEventListener("DOMContentLoaded", populateProductsTable);

const addProduct = async () => {
  const product = {
    image: imageInputElement.value,
    name: nameInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    stock: stockInputElement.value,
    id: idInputElement.value,
  };

  const response = await postNewProduct(product);
  showConfirmationMessage(
    "add-product-message",
    response,
    "Produsul a fost adaugat cu success!"
  );
};

// document.getElementById("add-product").addEventListener("click", addProduct);

// // document.getElementById("add-new-product").addEventListener("click", () => {
// //   console.log("test");
// //   // document.querySelector(".add-product-container").classList.toggle("hidden");
// // });

// // const handleProducts = async (event) => {
// //   if (event.target.classList.contains("fa-trash-can")) {
// //     console.log("suntem pe delete");
// //     const productId = event.target.parentNode.id;
// //     const response = await deleteProductById(productId);
// //     if (response.ok) {
// //       await populateProductsTable();
// //     }
// //   }
// // };
// // // ora 1:51'
// // document
// //   .getElementById("products-list")
// //   .addEventListener("click", handleProducts);
