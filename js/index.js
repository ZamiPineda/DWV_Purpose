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