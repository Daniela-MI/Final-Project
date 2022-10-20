const createCardFromProduct = (product) => {
  return `<div class='card'>
<h3>${product.name}</h3>
<img src='${product.imgURL}' />
<div class="card-body">
<p>${product.price} Ron</p>
<a href="details.html?product_id=${product.id}" class="btn btn-success">Details</a>
</div>
</div>`;
};

const createFilterItemsArray = (minPrice, maxPrice) => {
  const filterInterval = (maxPrice - minPrice) / 3;

  const filterItems = [
    { start: minPrice, end: minPrice + filterInterval - 1 },
    {
      start: minPrice + filterInterval,
      end: minPrice + 2 * filterInterval - 1,
    },
    { start: minPrice + 2 * filterInterval, end: maxPrice },
  ];

  return filterItems;
};

const createInnerHTMLforPriceFilter = (minPrice, maxPrice) => {
  const filterItemsIntervals = createFilterItemsArray(minPrice, maxPrice);

  const innerHTMLFilterCheckBoxes = filterItemsIntervals
    .map(
      (interval) =>
        ` 
    <div>
    <label>${interval.start} - ${interval.end}</label> Ron
    <input type="checkbox">
    </div>
    `
    )
    .join("");

  document.getElementById("price-filter").innerHTML = innerHTMLFilterCheckBoxes;
};

createInnerHTMLforPriceFilter(0, 300);

const getProductsOnIndexPage = () => {
  fetch("https://632214e5fd698dfa2906bdbf.mockapi.io/Products")
    .then((result) => result.json())
    .then((products) => {
      const productCards = products.map((product) =>
        createCardFromProduct(product)
      );
      const innerHTMLProducts = productCards.join("");
      document.querySelector(".products-container").innerHTML =
        innerHTMLProducts;
    });
};

window.addEventListener("DOMContentLoaded", getProductsOnIndexPage);

const filterByPrice = (event) => {
  if (event.target.type == "checkbox") {
    const checkboxes = document
      .getElementById("price-filter")
      .querySelectorAll("[type=checkbox]");

    checkboxes.forEach((checkbox) => {
      if (checkbox != event.target) {
        checkbox.checked = false;
      }
    });
  }

  if (event.target.checked == true) {
    const startPrice =
      event.target.previousElementSibling.textContent.split(" - ")[0];
    const endPrice =
      event.target.previousElementSibling.textContent.split(" - ")[1];

    fetch("https://632214e5fd698dfa2906bdbf.mockapi.io/Products")
      .then((result) => result.json())
      .then((products) => {
        const filteredByPriceProducts = products.filter(
          (product) =>
            product.price >= Number(startPrice) &&
            product.price <= Number(endPrice)
        );

        const productCards = filteredByPriceProducts.map((product) =>
          createCardFromProduct(product)
        );
        const innerHTMLProducts = productCards.join("");
        document.querySelector(".products-container").innerHTML =
          innerHTMLProducts;
      });
  } else {
    fetch("https://632214e5fd698dfa2906bdbf.mockapi.io/Products")
      .then((result) => result.json())
      .then((products) => {
        const productCards = products.map((product) =>
          createCardFromProduct(product)
        );
        const innerHTMLProducts = productCards.join("");
        document.querySelector(".products-container").innerHTML =
          innerHTMLProducts;
      });
  }
};

document
  .getElementById("price-filter")
  .addEventListener("click", filterByPrice);

const addProductToCart = async (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  if (products == null) products = [];
  products.push(id);

  localStorage.setItem("products", JSON.stringify(products));
};

const handleActions = (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = event.target.id;
    addProductToCart(productId);
  }
};
document
  .querySelector(".products-container")
  .addEventListener("click", handleActions);
