document.addEventListener("DOMContentLoaded", () => {
	// Iniciamos el fetch a la API

	fetch("https://zmszgmmzcdolvhbxrskm.supabase.co/rest/v1/untref?select=*", {
		headers: {
			apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			const listaProductos = data.map((producto) => {
				// Imprimimos la vista de la card con los botones
				return `
		  <div class="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
			<div class="card product-item text-center border h-250 p-4" style="width: 20rem;" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">
			  <img class="img-fluid mb-4" src="${producto.thumbnail}" alt="${producto.title}">
			  <div class="card-body">
				<h5 class="h6 d-inline-block mb-2">${producto.title}</h5>
				<h3 class="text-primary mb-3">Precio: $${producto.price}</h3>
				
				<a class="btn btn-primary text-white masDetalles" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">Más Detalles</a>
			  </div>
			</div>
		  </div>
		`;
			});
			document.getElementById("productos").innerHTML = listaProductos.join("");

			const masDetallesButtons = document.querySelectorAll(".masDetalles");

			masDetallesButtons.forEach((button) => {
				button.addEventListener("click", () => {
					const id = button.getAttribute("data-id");
					const url = `detalle.html?id=${id}`;
					window.location.href = url;
				});
			});
		})
		.catch((error) => {
			console.error("Error:", error);
		});
});