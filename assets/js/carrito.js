let cupones = [
  {
    nombre: "10%",
    descuento: 10,
    estado: true,
  },
  {
    nombre: "20%",
    descuento: 20,
    estado: true
  },
  {
    nombre: "50%",
    descuento: 50,
    estado: true
  },
];

let productosCarro = [];

let precioTotalCompra = 0;

if (localStorage.getItem("productos")) {
  productosCarro = JSON.parse(localStorage.getItem("productos"));
  console.log(productosCarro);
  actualizarCarro(productosCarro);
}

function actualizarCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(listadoProductos));

  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (accumulator, producto) => accumulator + producto.cantidad,
    valorInicial
  );

  document.querySelector("#cantidad-productos").innerText = sumaProductos;
}

cargarTablaProductos();

function cargarTablaProductos() {
  let acumuladorFilas = "";

  precioTotalCompra = 0;
  productosCarro.forEach((producto, index) => {
    let productoConDetalles = encontrarProducto(producto.sku);
    let precioUnitario =
      productoConDetalles.precio - productoConDetalles.descuento;
    let totalProducto = producto.cantidad * precioUnitario;
    precioTotalCompra += totalProducto;

    let template = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${productoConDetalles.sku}</td>
                <td>${productoConDetalles.nombre}</td>
                <td>${productoConDetalles.precio}</td>
                <td>${productoConDetalles.descuento}</td>
                <td>${precioUnitario}</td>
                <td>
                  <button onclick="restar('${productoConDetalles.sku}')">-</button>
                  <input type="number" value="${
                    producto.cantidad
                  }" style="width:30px;" min="0" max="10">
                  <button onclick="sumar('${productoConDetalles.sku}')">+</button>
                </td>
                <td>${totalProducto}</td>
            </tr>
    `;
    acumuladorFilas += template;
  });

  document.querySelector("#productos-carrito tbody").innerHTML =
    acumuladorFilas;
  document.querySelector(
    "#precio-total"
  ).innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`;
}

function encontrarProducto(sku) {
  let encontrado = productos.find((producto) => producto.sku == sku);
  return encontrado;
}

//LÓGICA VACIAR CARRITO
document
  .getElementById("btn-vaciar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("productos", "[]");
    location.reload();
  });

//LÓGICA DESCUENTO POR CUPÓN
document
  .getElementById("btn-descuento")
  .addEventListener("click", function (event) {
    let cuponIngresado = document.getElementById("input-cupon").value;

    let cuponEncontrado = cupones.find(
      (cupon) => cupon.nombre == cuponIngresado
    );


    if (cuponEncontrado && cuponEncontrado.estado == true) {
      alert("cupón encontrado.");
      precioTotalCompra =
        precioTotalCompra -
        (precioTotalCompra * cuponEncontrado.descuento) / 100;
      document.querySelector(
        "#precio-total"
      ).innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`;
      cuponEncontrado.estado = false;
    } else {
      alert("El cupón no existe. / o está caducado");
    }
  });


  //SUMAR PRODUCTOS

  function restar(sku){

    productosCarro.forEach((producto, index) => {
      if(sku == producto.sku){
        producto.cantidad = producto.cantidad - 1;
        if(producto.cantidad <= 0){
          if(confirm("Está seguro que desea eliminar?")){
            productosCarro.splice(index, 1)
          }else{
            producto.cantidad =1;
          }
        }
      }
    })
    actualizarCarro(productosCarro);
    cargarTablaProductos();
  }


  //RESTAR PRODUCTOS

  function sumar(sku){

    productosCarro.forEach((producto, index) => {
      if(sku == producto.sku){
        producto.cantidad = producto.cantidad + 1;
        if(producto.cantidad >= 10){
          producto.cantidad =10;
          alert("Alcanzo el limite de productos permitidos (10 unidades)")
        }
      }
    })
    actualizarCarro(productosCarro);
    cargarTablaProductos();
  }
