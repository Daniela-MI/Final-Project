import { postNewProduct } from "./products.js";

const imageInputElement = document.querySelector(".add-product-form #image");
const nameInputElement = document.querySelector(".add-product-form #name");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const priceInputElement = document.querySelector(".add-product-form #price");
const stockInputElement = document.querySelector(".add-product-form #stock");

const addProduct = async () => {
  const product = {
    image: imageInputElement.value,
    name: nameInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    stock: stockInputElement.value,
  };
  await postNewProduct(product);
  console.log(product);
};
document.getElementById("add-product").addEventListener("click", addProduct);
