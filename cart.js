let cart = JSON.parse(localStorage.getItem("cart"));

const createTable = () => {
  document.querySelector(".tableProd").innerHTML = `
	  <table class="table">
		  <tr>
			  <th>Imagine</th>
			  <th>Nume</th>
			  <th>Preț/Bucata</th>
			  <th>Cantitate</th>
			  <th>Șterge</th>
		  </tr>
	  </table>`;
  const table = document.querySelector(".table");
  cart.forEach((product) => {
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = `<a href="details.html?product_id=${product.id}"><img class="cartImg" src=${product.imgURL}></img></a>`;
    cell2.textContent = product.name;
    cell3.innerHTML = `<p class="greenText">${product.price} Ron</p>`;
    cell4.innerHTML = `<i class="fa-solid fa-minus redText marginRight" data-product-id=${product.id}>
			  </i>${product.items}<i class="fa-solid fa-plus greenText marginLeftS" data-product-id=${product.id}></i>`;
    cell5.innerHTML = `<a class="redBtn remove" data-product-id=${product.id}>
			  <i class="fa-solid fa-trash marginRight remove" data-product-id=${product.id}></i></a>`;
  });
};
createTable();

let buyTable = () => {
  let total = 0;
  let items = 0;
  if (cart) {
    cart.forEach((product) => {
      total += Number(product.price) * product.items;
      items += product.items;
    });
  }
  document.querySelector(
    ".items"
  ).innerHTML = `Produse: <span class="greenText">${items}</span>`;
  document.querySelector(
    ".totalPrice"
  ).innerHTML = `Preț Total: <span class="greenText">${total} Ron</span>`;
};

window.addEventListener("load", () => {
  buyTable();
  if (cart.length > 0) createTable();
});

document.querySelector(".tableProd").addEventListener("click", (e) => {
  const productInBasket = cart.find(
    (product) => product.id === e.target.getAttribute("data-product-id")
  );

  if (e.target.classList.contains("fa-plus")) {
    if (productInBasket.items < productInBasket.stock) {
      productInBasket.items++;
      createTable();
      buyTable();
    } else if (productInBasket.items === productInBasket.stock) {
      alert("Ai atins numărul maxim de produse disponibile.");
    }
  } else if (e.target.classList.contains("fa-minus")) {
    if (productInBasket.items > 1) {
      productInBasket.items--;
      createTable();
      buyTable();
    }
  } else if (e.target.classList.contains("remove")) {
    cart = cart.filter((product) => product.id != productInBasket.id);
    createTable();
    if (cart.length === 0) document.querySelector(".table").remove();
    buyTable();
  }
  localStorage.setItem("cart", JSON.stringify(cart));
});
