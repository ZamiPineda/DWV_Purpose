function agregarAlCarrito(elemento) {
    // Obtén el nombre del postre desde el elemento padre
    console.log('Haciendo clic en agregarAlCarrito');
    var nombrePostre = elemento.parentNode.querySelector('p').innerText;

    // Busca si ya existe un elemento con el mismo nombre en el carrito
    var elementoExistente = Array.from(document.querySelectorAll('#carritoLista li')).find(li => li.innerText.includes(nombrePostre));

    if (elementoExistente) {
        // Si ya existe, incrementa la cantidad en ese elemento
        var spanCantidad = elementoExistente.querySelector('.cantidad');
        var cantidad = parseInt(spanCantidad.innerText);
        cantidad++;
        spanCantidad.innerText = cantidad;
    } else {
        // Si no existe, crea un nuevo elemento en la lista del carrito
        var nuevoItem = document.createElement('li');
        nuevoItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Agrega el nombre del postre y la cantidad (inicialmente 1)
        nuevoItem.innerHTML = `
            ${nombrePostre} 
            <span class="badge badge-primary badge-pill cantidad">1</span>
            <div>
                <button type="button" class="btn btn-success btn-sm" onclick="agregarMas(this)">+</button>
                <button type="button" class="btn btn-warning btn-sm" onclick="restar(this)">-</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(this)">Eliminar</button>
            </div>
        `;

        // Agrega el nuevo elemento a la lista del carrito en el modal
        document.getElementById('carritoLista').appendChild(nuevoItem);
    }

    // Abre el modal de Bootstrap
    $('#carritoModal').modal('show');
}

function agregarMas(botonAgregarMas) {
    // Obtén el span de cantidad del elemento padre (li)
    var spanCantidad = botonAgregarMas.closest('li').querySelector('.cantidad');

    // Incrementa la cantidad
    var cantidad = parseInt(spanCantidad.innerText);
    cantidad++;
    spanCantidad.innerText = cantidad;
}

function restar(botonRestar) {
    // Obtén el span de cantidad del elemento padre (li)
    var spanCantidad = botonRestar.closest('li').querySelector('.cantidad');

    // Obtiene la cantidad actual
    var cantidad = parseInt(spanCantidad.innerText);

    // Asegúrate de que no sea menor que 1
    if (cantidad > 1) {
        cantidad--;
        spanCantidad.innerText = cantidad;
    }
}

function eliminarDelCarrito(botonEliminar) {
    // Elimina el elemento padre (li) del botón de eliminar
    botonEliminar.closest('li').remove();
}

// Función para buscar un elemento que contiene un texto específico
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

// Función para manejar el inicio de sesión
function iniciarSesion() {
    var usernameInput = document.getElementById('usernameLogin');
    var passwordInput = document.getElementById('passwordLogin');
    var mensajeElement = document.getElementById('mensajeLogin');
    var usernameGroup = document.getElementById('usernameGroupLogin');

    var username = usernameInput.value;
    var password = passwordInput.value;

    // Verifica si el usuario existe en el almacenamiento local
    if (localStorage.getItem(username) === password) {
        // Muestra mensaje de éxito en verde
        mostrarMensaje('¡Inicio de sesión exitoso!', 'alert-success', mensajeElement, usernameGroup, true);
        // Puedes redirigir o realizar otras acciones después del inicio de sesión exitoso
    } else {
        // Muestra mensaje de error debajo del input de username
        mostrarMensaje('Usuario incorrecto', 'alert-danger', mensajeElement, usernameGroup, false);
        // Cambia el color del borde del input del usuario a rojo
        cambiarBordeRojo(usernameInput);
        // No cerramos el modal en caso de error
    }
}

// Función para manejar el registro
function registrarse() {
    var usernameInput = document.getElementById('usernameRegister');
    var passwordInput = document.getElementById('passwordRegister');
    var mensajeElement = document.getElementById('mensajeRegister');
    var usernameGroup = document.getElementById('usernameGroupRegister');

    var username = usernameInput.value;
    var password = passwordInput.value;

    // Verifica si el usuario ya existe en el almacenamiento local
    if (localStorage.getItem(username)) {
        // Muestra mensaje de error debajo del input de username
        mostrarMensaje('Usuario existente', 'alert-danger', mensajeElement, usernameGroup, false);
        // Cambia el color del borde del input del usuario a rojo
        cambiarBordeRojo(usernameInput);
        // No cerramos el modal en caso de error
    } else {
        // Registra al usuario en el almacenamiento local
        localStorage.setItem(username, password);
        // Muestra mensaje de éxito en verde
        mostrarMensaje('¡Registro exitoso!', 'alert-success', mensajeElement, usernameGroup, true);
        // Puedes redirigir o realizar otras acciones después del registro exitoso
    }
}

// Función para cambiar el borde del input a rojo
function cambiarBordeRojo(inputElement) {
    inputElement.style.border = '1px solid red';
}

// Función para restaurar el color del borde del input
function restaurarColorBorde(inputElement) {
    inputElement.style.border = '';
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, clase, mensajeElement, inputGroup, exitoso) {
    mensajeElement.textContent = mensaje;
    mensajeElement.className = 'alert ' + clase;

    // Cambia el color del borde del input en caso de éxito
    if (exitoso) {
        inputGroup.classList.add('border-success');
    } else {
        // Si es un mensaje de error, restaura el color del borde después de 2 segundos
        setTimeout(function () {
            inputGroup.classList.remove('border-success');
        }, 2000);
    }

    // Oculta el mensaje después de 2 segundos
    setTimeout(function () {
        mensajeElement.textContent = '';
        mensajeElement.className = 'alert';
        
        // Cierra el modal después de 2 segundos si es un mensaje de éxito
        if (exitoso) {
            setTimeout(function () {
                $('#loginModal').modal('hide');
                $('#registerModal').modal('hide');
            }, 2000);
        }
    }, 2000);
}

// Event listener para el formulario de inicio de sesión
document.getElementById('loginModal').querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    iniciarSesion();
});

// Event listener para el formulario de registro
document.getElementById('registerModal').querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    registrarse();
});