function mostrarSeccion(idSeccion) {
    // 1. Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(function(seccion) {
        seccion.classList.remove('activa');
    });

    // 2. Quitar estado activo de los botones del menú
    const botonesNav = document.querySelectorAll('.nav-btn');
    botonesNav.forEach(function(boton) {
        boton.classList.remove('activo');
    });

    // 3. Activar la sección elegida y animar su tabla en cascada
    const seccionSeleccionada = document.getElementById(idSeccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('activa');

        // Reinicia el estado de todas las tablas y filas
        document.querySelectorAll('.tabla-oculta').forEach(t => t.classList.remove('mostrar'));
        document.querySelectorAll('.fila-animada').forEach(f => f.classList.remove('mostrar'));

        const tabla = seccionSeleccionada.querySelector('.tabla-oculta');
        const filas = seccionSeleccionada.querySelectorAll('.fila-animada');

        // Despliegue con retraso en cascada
        setTimeout(function() {
            if (tabla) tabla.classList.add("mostrar");
            
            filas.forEach(function(fila, index) {
                setTimeout(function() {
                    fila.classList.add("mostrar");
                }, (index + 1) * 600); 
            });
        }, 800);
    }

    // 4. Marcar el botón correspondiente en la barra lateral
    const botonSeleccionado = Array.from(botonesNav).find(btn => btn.getAttribute('onclick').includes(idSeccion));
    if (botonSeleccionado) {
        botonSeleccionado.classList.add('activo');
    }
        
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Evento de alerta de confirmación para los hipervínculos externos
function confirmarSalida(event, portal) {
    const confirmacion = confirm(`Estás a punto de salir del portafolio para visitar el portal oficial de ${portal}.\n\n¿Deseas continuar?`);
    
    if (!confirmacion) {
        event.preventDefault();
    }
}

// Iniciar mostrando la pestaña principal al cargar el documento
document.addEventListener("DOMContentLoaded", function() {
    mostrarSeccion('inicio');
});