const searchParamString = window.location.search;
const searchParams = new URLSearchParams(searchParamString);
const productId = searchParams.get("product_id");
const productURL = `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/${productId}`;
let product;

const showProduct = async () => {
  const result = await fetch(productURL);
  product = await result.json();

  const productCardDetails = `
	<img class="productImage" src='${product.imgURL}'/>
	<div class="cardDetails1"> 
	   <div class="rightSide description">
			<p class="descrText"><b>Name:</b> ${product.name}</p>
			<p class="descrText"><b>Price:</b> ${product.price} Ron</p>
			</span></p>
			<p class="descrText"><b>In stock:</b> ${product.description}</p>
			<form onsubmit="return false">
				<p class="descrText"><b>Quantity:</b>
					<input id="input-quantity" type="number" value="1" min="1" max="${product.stock}" style="width:50px">
				</p>
			  	<button id=${productId} class="goldBtn addToCart" type="submit">
			  		<i class="fa-solid fa-bag-shopping"></i>Add to cart
				</button>
			   	</div>
			</form>
		</div>
	</div>
	<div class="cardDetails2"> <p class="descrText1"><b>Description:</b> ${product.description}</p></div>`;
  document.querySelector(".product-details").innerHTML = productCardDetails;
};

window.addEventListener("DOMContentLoaded", showProduct);

document.querySelector(".product-details").addEventListener("click", (e) => {
  const inputDetails = document.querySelector("#input-quantity");
  const inputQuantity = Number(inputDetails.value);
  if (
    e.target.classList.contains("addToCart") &&
    inputDetails.checkValidity()
  ) {
    let cart = [];
    if (localStorage.getItem("cart") === null) {
      cart.push({ ...product, items: inputQuantity });
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
      const productInCart = cart.find((product) => product.id === productId);
      if (productInCart != undefined) {
        productInCart.items += inputQuantity;
      } else {
        const productToBeAddedInCart = { ...product, items: inputQuantity };
        cart.push(productToBeAddedInCart);
      }
    }
    if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
    // Confirmation message
    document.querySelector(".confirm").style.display = "block";
    setTimeout(() => {
      document.querySelector(".confirm").style.display = "none";
    }, 1000);
  }
});
