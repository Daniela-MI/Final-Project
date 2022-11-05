import { getAllProducts, deleteProductById } from "./products.js";

const productURL = "https://632214e5fd698dfa2906bdbf.mockapi.io/Products/";
let productId;
let response;
const confirm = document.querySelector(".confirm");

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
          <button class="btn btn-warning editBtn" data-id="${product.id}">
          <i class="fa-solid fa-pen editBtn" data-id="${
            product.id
          }"></i> </button>
        </td>
      </tr>`
    )
    .join("");

  document.getElementById("products-table-body").innerHTML = tableContent;
};

window.addEventListener("DOMContentLoaded", populateProductsTable);

const addOrEditProduct = async (URL, methodHTTP, msgConfirm) => {
  const imageInputElement = document.querySelector("#image");
  const nameInputElement = document.querySelector("#name");
  const descriptionInputElement = document.querySelector("#description");
  const priceInputElement = document.querySelector("#price");
  const stockInputElement = document.querySelector("#stock");
  response = await fetch(URL, {
    method: methodHTTP,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imgURL: imageInputElement.value,
      name: nameInputElement.value,
      description: descriptionInputElement.value,
      price: priceInputElement.value,
      stock: stockInputElement.value,
    }),
  });
  let data = await response.json();
  console.log(msgConfirm, data);
  confirmMsg(msgConfirm);
  populateProductsTable();
};

const confirmMsg = (string) => {
  if (response.ok) {
    confirm.textContent = `Produsul a fost ${string}.`;
  } else {
    confirm.classList.add("redBg");
    confirm.textContent =
      "Hei, a aparut o problema. Te rugăm să încerci din nou.";
  }
  confirm.style.display = "block";
  setTimeout(() => {
    confirm.style.display = "none";
  }, 3000);
};

document
  .getElementById("add-product")
  .addEventListener("click", () =>
    addOrEditProduct(productURL, "POST", "adăugat")
  );

document
  .getElementById("edit-product")
  .addEventListener("click", () =>
    addOrEditProduct(`${productURL}${productId}`, "PUT", "modificat")
  );

document.getElementById("add-new-product").addEventListener("click", () => {
  document.querySelector(".add-product-container").classList.toggle("hidden");
});

const editProduct = async (e) => {
  document.querySelector(".add-product-container").classList.remove("hidden");

  const productURL = `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/${productId}`;
  const result = await fetch(productURL);
  let product = await result.json();
  document.querySelector(".add-product-form").innerHTML = `
            <div>
              <label for="image" >Imagine</label>
              <input type="text" name="" id="image" class="boxLength" value='${product.imgURL}' />
            </div>
            <div>
              <label for="name">Nume</label>
              <input type="text" name="" id="name" class="boxLength" value='${product.name}' />
            </div>
            <div>
              <label for="description">Descriere</label>
              <input type="text" id="description" class="boxLength" value="${product.description}" />
            </div>
            <div>
              <label for="price">Preț</label>
              <input type="text" id="price" class="boxLength" value="${product.price}" />
            </div>
            <div>
              <label for="stock">În stoc</label>
              <input type="text" id="stock" class="boxLength" value='${product.stock}' />
            </div>`;
};

const handleProducts = async (event) => {
  if (event.target.classList.contains("fa-trash-can")) {
    console.log("suntem pe butonul de delete");
    const productId = event.target.parentNode.id;
    const response = await deleteProductById(productId);
    if (response.ok) {
      await populateProductsTable();
    }
  } else if (event.target.classList.contains("editBtn")) {
    productId = event.target.dataset.id;
    editProduct();
  }
};

document
  .getElementById("products-list")
  .addEventListener("click", handleProducts);
