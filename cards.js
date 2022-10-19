export const createProductCard = (product) =>
  `<div class ='card' style="width: 12rem;">
            <h5 class="card-title">${product.name}</h5>
            <img class="card-img-top" src="${product.imgURL}" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">${product.price}</p>
              <a href="details.html?product_id=${product.id}" class="btn btn-primary">Details</a>
              <button id=${product.id} class="btn btn-danger add-to-cart">Add to cart</button>
              </div>
          </div>`;
