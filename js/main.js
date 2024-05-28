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

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }// if length
    return true;
}//validar cantidad


// boton agregar
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertaValidacionesTexto.innerHTML="";
    alertaValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    if (txtNombre.value.length<3){
        alertaValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto <br/>"
        // alerta del texto
       alertaValidaciones.style.display="block";
       //sombreado del recuadro en rojo
       txtNombre.style.border="solid red medium";
    } //length<3
    
    if (! validarCantidad()){ //Se utiliza el += para concatenar lo de txtnombre por si hay un error con ese y se muestren ambos mensajes
        alertaValidacionesTexto.innerHTML+= "El  <strong>Número</strong> no es correcto";
        alertaValidaciones.style.display="block";
        txtNumber.style.border="solid red medium";
    } //Validar cantidad
});

//boton limpiar todo
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    alertaValidacionesTexto.innerHTML="";
    alertaValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
     //limpia las secciones de nombre y cantidad
    txtNombre.value = "";
    txtNumber.value = "";
});

