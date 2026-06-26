document.addEventListener("DOMContentLoaded", inicializarApp);

function inicializarApp() {
    const formulario = document.querySelector("form");
    
    if (formulario) {
        formulario.addEventListener("submit", validarFormulario);
    }
}

function validarFormulario(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("input[name='nombre']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const pass = document.querySelector("input[name='pass']").value;

    if (nombre === "") {
        mostrarNotificacion("Error: Por favor, ingresa tu nombre.", "error");
        return;
    }

    if (email === "" || email.indexOf("@") === -1) {
        mostrarNotificacion("Error: Por favor, ingresa un correo válido que contenga '@'.", "error");
        return;
    }

    if (pass.length < 6) {
        mostrarNotificacion("Error: La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }


    mostrarNotificacion(`¡Gracias ${nombre}! Tu formulario es válido y está listo para enviarse.`, "exito");
    
    evento.target.reset();
}

function mostrarNotificacion(mensaje, tipo) {

    const alertaPrevia = document.querySelector(".alerta-js");
    if (alertaPrevia) {
        eliminarElemento(alertaPrevia);
    }

    const cajaNotificacion = document.createElement("div");
    
    
    cajaNotificacion.classList.add("alerta-js"); 
    cajaNotificacion.textContent = mensaje;
    
    
    cajaNotificacion.style.padding = "15px";
    cajaNotificacion.style.marginTop = "20px";
    cajaNotificacion.style.borderRadius = "5px";
    cajaNotificacion.style.fontWeight = "bold";
    cajaNotificacion.style.textAlign = "center";
    cajaNotificacion.style.border = "1px solid gold";

    if (tipo === "error") {
        cajaNotificacion.style.backgroundColor = "rgba(200, 0, 0, 0.8)"; 
        cajaNotificacion.style.color = "white";
    } else {
        cajaNotificacion.style.backgroundColor = "rgba(0, 150, 0, 0.8)"; 
        cajaNotificacion.style.color = "gold";
    }

    
    const botonCerrar = document.createElement("button");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.style.marginLeft = "15px";
    botonCerrar.style.cursor = "pointer";
    botonCerrar.style.backgroundColor = "#1a1a2e";
    botonCerrar.style.color = "white";
    botonCerrar.style.border = "1px solid gold";
    botonCerrar.style.padding = "5px 10px";

    botonCerrar.addEventListener("click", function() {
        eliminarElemento(cajaNotificacion);
    });

    cajaNotificacion.appendChild(botonCerrar);

    const mainElement = document.querySelector("main");
    mainElement.insertBefore(cajaNotificacion, mainElement.firstChild);
}

function eliminarElemento(elemento) {
    elemento.remove();
}