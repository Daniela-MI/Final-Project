const showProductDetails = async () => {
  const searchParamString = window.location.search;

  const searchParams = new URLSearchParams(searchParamString);

  const productId = searchParams.get("product_id");
  const productURL = `https://632214e5fd698dfa2906bdbf.mockapi.io/Products/${productId}`;
  const result = await fetch(productURL);
  const productInfo = await result.json();

  const productCardDetails = `
  <img class="productImage" src='${productInfo.imgURL}'/>
  <div class="cardDetails1"> 
     <div class="rightSide description">
  				<p class="descrText"><b>Name:</b> ${productInfo.name}</p>
  				<p class="descrText"><b>Price:</b> ${productInfo.price} Ron</p>
  				</span></p>
  				<p class="descrText"><b>In stock:</b> ${productInfo.stock}</p>
  				<form onsubmit="return false">
  					<p class="descrText"><b>Quantity:</b>
  						<input id="input-quantity" type="number" value="1" min="1" max="${productInfo.stock}" style="width:50px">
  					</p>
            <button id=${productId} class="goldBtn addToCart" type="submit">
            <i class="fa-solid fa-bag-shopping"></i>Add to cart
          </button>
             </div>
  				</form>
  	</div>
  </div>
  <div class="cardDetails2"> <p class="descrText1"><b>Description:</b> ${productInfo.description}</p></div>`;
  document.querySelector(".product-details").innerHTML = productCardDetails;
};

window.addEventListener("DOMContentLoaded", showProductDetails);
