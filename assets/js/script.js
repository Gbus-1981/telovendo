// Lista de productos
const productos = [
  {codigo: "M001", nombre: "Chaqueta de Cuero", precio: 85000, descripcion: "Chaqueta clásica de cuero negro, ideal para cualquier temporada.", img: "assets/img/chaqueta.jpg"},
  {codigo: "M002", nombre: "Zapatillas Urbanas", precio: 60000, descripcion: "Zapatillas deportivas de estilo urbano, cómodas y modernas.", img: "assets/img/zapatillas.jpg"},
  {codigo: "M003", nombre: "Vestido de Noche", precio: 95000, descripcion: "Full HD con HDMI.", img: "assets/img/vestido.jpg"},
  {codigo: "M004", nombre: "Camisa de Algodón", precio: 35000, descripcion: "Bluetooth y cancelación de ruido.", img: "assets/img/camisa.jpg"},
  {codigo: "M005", nombre: "Pantalón Jeans Slim Fit", precio: 42000, descripcion: "Jeans azul oscuro, corte slim fit, resistentes y cómodos.", img: "assets/img/pantalon.jpg"},
  {codigo: "M006", nombre: "Bolso de Mano", precio: 55000, descripcion: "Bolso de cuero sintético con cierre metálico y correas ajustables.", img: "assets/img/bolso.jpg"},
  {codigo: "M007", nombre: "Reloj de Pulsera", precio: 70000, descripcion: "Reloj análogo de diseño minimalista con correa de acero.", img: "assets/img/reloj.jpg"},
  {codigo: "M008", nombre: "Gafas de Sol", precio: 28000, descripcion: "Lentes polarizados con protección UV400 y estilo retro.", img: "assets/img/gafas.jpg"},
  {codigo: "M009", nombre: "Sombrero Fedora", precio: 25000, descripcion: "Sombrero clásico de ala ancha en tono beige.", img: "assets/img/sombrero.jpg"},
  {codigo: "M010", nombre: "Bufanda de Lana", precio: 20000, descripcion: "Bufanda tejida de lana natural, ideal para invierno.", img: "assets/img/bufanda.jpg"},
];

const contenedorProductos = document.getElementById("productos");
const tablaCarrito = document.querySelector("#tabla-carrito tbody");
const resumen = document.getElementById("resumen");

let carrito = [];

// Renderizar productos
productos.forEach(prod => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>${prod.descripcion}</p>
    <p><b>$${prod.precio.toLocaleString()}</b></p>
    <label>
      <input type="checkbox" class="check" data-codigo="${prod.codigo}"> Seleccionar
    </label>
    <br>
    <label>Cantidad:
      <input type="number" min="1" value="1" class="cantidad" data-codigo="${prod.codigo}">
    </label>
  `;
  contenedorProductos.appendChild(card);
});

// Manejo de selección
contenedorProductos.addEventListener("change", e => {
  if (e.target.classList.contains("check")) {
    const codigo = e.target.dataset.codigo;
    const cantidadInput = document.querySelector(`.cantidad[data-codigo="${codigo}"]`);
    const cantidad = parseInt(cantidadInput.value);

    if (e.target.checked) {
      const prod = productos.find(p => p.codigo === codigo);
      carrito.push({...prod, cantidad});
    } else {
      carrito = carrito.filter(item => item.codigo !== codigo);
    }
    renderCarrito();
  }

  if (e.target.classList.contains("cantidad")) {
    const codigo = e.target.dataset.codigo;
    const check = document.querySelector(`.check[data-codigo="${codigo}"]`);
    if (check.checked) {
      const item = carrito.find(p => p.codigo === codigo);
      item.cantidad = parseInt(e.target.value);
      renderCarrito();
    }
  }
});

// Renderizar carrito
function renderCarrito() {
  tablaCarrito.innerHTML = "";
  let neto = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    neto += subtotal;
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button onclick="eliminar('${item.codigo}')">X</button></td>
    `;
    tablaCarrito.appendChild(fila);
  });

  const iva = neto * 0.19;
  let total = neto + iva;
  let despacho = 0;

  if (total < 100000) {
    despacho = total * 0.05;
    total += despacho;
  }

  resumen.innerHTML = `
    <p><b>Neto:</b> $${neto.toLocaleString()}</p>
    <p><b>IVA (19%):</b> $${iva.toLocaleString()}</p>
    <p><b>Despacho:</b> $${despacho.toLocaleString()}</p>
    <p><b>Total:</b> $${total.toLocaleString()}</p>
  `;
}

// Eliminar producto
function eliminar(codigo) {
  carrito = carrito.filter(p => p.codigo !== codigo);
  document.querySelector(`.check[data-codigo="${codigo}"]`).checked = false;
  renderCarrito();
}

// --- Carrusel ---
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Cambio automático cada 5s
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);
