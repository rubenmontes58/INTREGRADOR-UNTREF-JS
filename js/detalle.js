// Obtener el producto con el ID especificado de la base de datos.
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch(`https://zmszgmmzcdolvhbxrskm.supabase.co/rest/v1/untref?id=eq.${id}`, {
	headers: {
		apikey:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
	},
})
	.then((response) => response.json())

	.then((data) => {
		// Mostrar los datos del producto en la página.
		document.getElementById("idValue").textContent = data[0].id;

		document.getElementById("titleValue").textContent = data[0].title;
		document.getElementById("descriptionValue").textContent =
			data[0].description;
		document.getElementById("priceValue").textContent = data[0].price;
		document.getElementById("thumbnailValue").src = data[0].thumbnail;
		document.getElementById("cantidadValue").textContent = data[0].cantidad;

		// Añadir el producto al carrito cuando el usuario hace clic en el botón "Añadir al carrito".
		const addToCartButton = document.getElementById("addToCartButton");

		addToCartButton.addEventListener("click", () => {
			const product = {
				id: data[0].id,
				title: data[0].title,
				description: data[0].description,
				price: data[0].price,
				thumbnail: data[0].thumbnail,
				cantidad: data[0].cantidad,
			};

			// Obtener el array del carrito del almacenamiento local.
			let cart = localStorage.getItem("cart");
			if (!cart) {
				cart = [];
			} else {
				cart = JSON.parse(cart);
			}

			// Agregar el producto al carrito.
			cart.push(product);

			// Guardar el carrito actualizado en el almacenamiento local.
			localStorage.setItem("cart", JSON.stringify(cart));

			// Mostrar un mensaje de confirmación.
			console.log("El producto ha sido agregado al carrito.");

			// Redirigir a la página del carrito.
			window.location.href = "/carrito.html";
		});
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// Llamar a la función de actualización del carrito al cargar la página.
updateCart();
console.log("El carrito ha sido actualizado.");
