let cart = JSON.parse(localStorage.getItem("cart"));

const createTable = () => {
  document.querySelector(".tableProd").innerHTML = `
	<table class="table">
		<tr>
			<th>Image</th>
			<th>Name</th>
			<th>Price</th>
			<th>Quantity</th>
			<th>Remove</th>
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
    let cell6 = row.insertCell(5);
    cell1.innerHTML = `<a href="details.html?id=${product.id}"><img class="cartImg" src=${product.product.imgURL}></img></a>`;
    cell2.textContent = product.name;
    cell3.innerHTML = `<p class="greenText">$${product.price}</p>`;
    cell4.innerHTML = `<i class="fa-solid fa-minus redText marginRight" data-product-id=${product.id}>
			</i>${product.items}<i class="fa-solid fa-plus greenText marginLeftS" data-product-id=${product.id}></i>`;
    cell5.innerHTML = `<a class="redBtn remove" data-product-id=${product.id}>
			<i class="fa-solid fa-trash marginRight remove" data-product-id=${product.id}></i>Remove</a>`;
  });
};
