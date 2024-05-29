// El codigo va acá 

// variables botones
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
// variables campos
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

// para validaciones 
let alertaValidaciones = document.getElementById("alertValidaciones");
let alertaValidacionesTexto = document.getElementById("alertValidacionesTexto");

let contadorProductos = document.getElementById("contadorProductos"); //ln 90
let productosTotal = document.getElementById("productosTotal"); //ln 97
let precioTotal = document.getElementById("precioTotal"); // ln 103

//para la tabla
let tablaListaCompras = document.getElementById("tablaListaCompras");
//se puede utilizar el get element del let para seleccionar el tagname de esa sección de cuerpo tabla
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

//Bandera función booleana
let isValid=true;
// variable precio
let precio;
// contador
let contador=0;
let costoTotal = 0;
let totalEnProductos = 0;

// aqui se almacena la información de la tabla, nuevo arreglo
let datos = new Array();

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }// if length para que tenga una extensión el numero
    if (isNaN(txtNumber.value)){
        return false;
    }// is NaN para que unicamente se puedan colocar numeros
    if(Number(txtNumber.value)<=0){
        return false;
    } // <=0  para tomar solo valores mayores iguales a 0
    return true;
}//validar cantidad


// boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertaValidacionesTexto.innerHTML="";
    alertaValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true; //se coloca porque cada ocación que se presione el boton se establece como verdadera y se haga la validación con los if
    if (txtNombre.value.length<3){
        alertaValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto <br/>"
        // alerta del texto
       alertaValidaciones.style.display="block";
       //sombreado del recuadro en rojo
       txtNombre.style.border="solid red medium";
       isValid=false;
    } //length<3
    
    if (! validarCantidad()){ //Se utiliza el += para concatenar lo de txtnombre por si hay un error con ese y se muestren ambos mensajes
        alertaValidacionesTexto.innerHTML+= "El  <strong>Número</strong> no es correcto";
        alertaValidaciones.style.display="block";
        txtNumber.style.border="solid red medium";
        isValid=false;
    } //Validar cantidad

    if (isValid) {
        contador++;
        precio = getPrecio();
        let row = `<tr> 
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;

        let elemento = `{"id": ${contador},
                         "nombre": "${txtNombre.value}",
                         "cantidad": "${txtNumber.value}",
                         "precio":${precio}
    }`;
        datos.push(JSON.parse(elemento));
        localStorage.setItem("datos", JSON.stringify(datos)); //se hacen cadena los datos para poder guardarlos en el local storage

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText= contador;
        // se hacen variables para colocarlas dentro de la pagina donde va el dato requerido
        totalEnProductos += parseFloat(txtNumber.value);
        costoTotal += precio * parseFloat(txtNumber.value);
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos );
        localStorage.setItem("costoTotal", costoTotal);
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();  //focus te regresa al campo
    }// is valid 

});

function getPrecio(){
        return Math.floor(Math.floor((Math.random()*100) * 100)/100);
}

 
//boton limpiar todo
btnClear.addEventListener("click", function(event){
    event.preventDefault();

     //limpia las secciones de nombre y cantidad
    txtNombre.value = "";
    txtNumber.value = "";

    alertaValidacionesTexto.innerHTML="";
    alertaValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML="";
    //establecemos valores a 0
    contador= 0;
    totalEnProductos= 0;
    costoTotal= 0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText= contador;
    productosTotal.innerText= totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
}); //btn clear all

// evento de ventana para el local storage
window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contador")!=null){
        contador=Number(this.localStorage.getItem("contador"));
    }// if contador

    if (this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos=Number(this.localStorage.getItem("totalEnProductos"));
    }// if totalEnProductos

    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal=Number(this.localStorage.getItem("costoTotal"));
    } //if costo total

    if (this.localStorage.getItem("datos")!=null){
        datos=JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr> 
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
        </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    } // if datos
    contadorProductos.innerText= contador;
    productosTotal.innerText= totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
}) //window load