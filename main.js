document.addEventListener("DOMContentLoaded", inicializarApp);

function inicializarApp() {
    // ========== 1. VALIDACIÓN DE FORMULARIO ==========
    const formulario = document.querySelector("form");
    if (formulario) {
        formulario.addEventListener("submit", validarFormulario);
    }

    // ========== 2. CONTADOR DE VISITAS ==========
    let visitas = localStorage.getItem("visitas_mu") || 0;
    visitas = parseInt(visitas) + 1;
    localStorage.setItem("visitas_mu", visitas);

    const footer = document.querySelector("footer");
    if (footer) {
        let contador = document.createElement("p");
        contador.id = "contadorVisitas";
        contador.innerText = "👁️ Visitas: " + visitas;
        contador.style.color = "gold";
        contador.style.fontSize = "14px";
        contador.style.marginTop = "10px";
        footer.appendChild(contador);
    }

    // ========== 3. MOSTRAR/OCULTAR INFORMACIÓN ==========
    const btnMostrar = document.getElementById("btnMostrar");
    const infoExtra = document.getElementById("infoExtra");

    if (btnMostrar && infoExtra) {
        btnMostrar.addEventListener("click", function() {
            if (infoExtra.style.display === "none") {
                infoExtra.style.display = "block";
                btnMostrar.innerText = "Ocultar información";
            } else {
                infoExtra.style.display = "none";
                btnMostrar.innerText = "Mostrar más información";
            }
        });
    }

    // ========== 4. AGREGAR PERSONAJES FAVORITOS ==========
    const inputPersonaje = document.getElementById("nuevoPersonaje");
    const btnAgregar = document.getElementById("btnAgregarPersonaje");
    const listaPersonajes = document.getElementById("listaPersonajes");

    if (inputPersonaje && btnAgregar && listaPersonajes) {
        let personajes = JSON.parse(localStorage.getItem("personajes_mu")) || [];
        personajes.forEach(function(p) {
            agregarPersonaje(p, listaPersonajes);
        });

        btnAgregar.addEventListener("click", function() {
            const nombre = inputPersonaje.value.trim();
            if (nombre === "") {
                alert("Ingresá el nombre de un personaje.");
                return;
            }
            personajes.push(nombre);
            localStorage.setItem("personajes_mu", JSON.stringify(personajes));
            agregarPersonaje(nombre, listaPersonajes);
            inputPersonaje.value = "";
        });
    }
}

// ========================================
// FUNCIONES
// ========================================

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

    mostrarNotificacion("¡Gracias " + nombre + "! Tu formulario es válido y está listo para enviarse.", "exito");
    evento.target.reset();
}

function agregarPersonaje(nombre, lista) {
    const li = document.createElement("li");
    li.innerText = nombre;

    const btnEliminar = document.createElement("button");
    btnEliminar.innerText = "✖";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.backgroundColor = "#1a1a2e";
    btnEliminar.style.color = "white";
    btnEliminar.style.border = "1px solid gold";
    btnEliminar.style.padding = "2px 8px";
    btnEliminar.style.borderRadius = "3px";

    btnEliminar.addEventListener("click", function() {
        li.remove();
        let personajes = JSON.parse(localStorage.getItem("personajes_mu")) || [];
        personajes = personajes.filter(function(p) {
            return p !== nombre;
        });
        localStorage.setItem("personajes_mu", JSON.stringify(personajes));
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
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
    if (mainElement) {
        mainElement.insertBefore(cajaNotificacion, mainElement.firstChild);
    }
}

function eliminarElemento(elemento) {
    elemento.remove();
}