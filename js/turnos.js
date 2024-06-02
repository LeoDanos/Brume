// PROFESIONALES

class Professional {
    constructor(nameProfessional, category) {
        this.nameProfessional = nameProfessional;
        this.category = category; // Cosmetologia - Manicuria
    }
}

let Xoana = new Professional("Xoana", "Cosmetologia");
let Erica = new Professional("Erica", "Manicuria");

const profesionales = [Xoana, Erica];

const nombresProfesionales = profesionales.map((x) => x.nameProfessional); // Excusa para usarlo para elegir la profesional por nombre en vez de por N° como en la 1ra Preentrega

// SERVICIOS

class Service {
    constructor(category, nameService, durationMinutes, price) {
        this.category = category; // Cosmetologia - Manicuria
        this.nameService = nameService;
        this.durationMinutes = durationMinutes;
        this.price = price;
        this.deposit = (price * 50) / 100;
    }
}

// SERVICIOS DE COSMETOLOGIA

let limpiezaFacialProfunda = new Service("Cosmetologia", "Limpieza Facial Profunda", 90, 16600);
let limpiezaProfundaEspalda = new Service("Cosmetologia", "Limpieza Profunda de Espalda", 90, 18300);
let dermaplaning = new Service("Cosmetologia", "Dermaplaning", 90, 17800);
let hifuMiniRF = new Service("Cosmetologia", "Hifu Mini + Radio Frecuencia", 90, 18800);
let mesoterapiaVirtual = new Service("Cosmetologia", "Mesoterapia Virtual (Antiage)", 90, 17300);
let peeling = new Service("Cosmetologia", "Peeling", 90, 17800);
let hydraLips = new Service("Cosmetologia", "Hydra Lips", 90, 15600);
let microneedlingDermapen = new Service("Cosmetologia", "Microneedling con Dermapen", 90, 21800);
let liftingPestanias = new Service("Cosmetologia", "Lifting de Pestañas", 60, 14800);
let laminadoCejas = new Service("Cosmetologia", "Laminado de Cejas", 60, 13900);

const serviciosCosmetologia = [limpiezaFacialProfunda, limpiezaProfundaEspalda, dermaplaning, hifuMiniRF, mesoterapiaVirtual, peeling, hydraLips, microneedlingDermapen, liftingPestanias, laminadoCejas];

// Filtrado por Duracion: podria servir para filtrar servicios dependiendo la disponibilidad de la agenda, se puede probar desde consola indicando 60 o 90, podria usarse >= en un futuro...

function cosmetologiaMin(min) {
    console.table(serviciosCosmetologia.filter((x) => x.durationMinutes === min));
}

// SERVICIOS DE MANICURIA

let esmaltadoSemipermanente = new Service("Manicuria", "Esmaltado Semipermanente", 90, 8000);
let kappingGel = new Service("Manicuria", "Kapping Gel", 90, 6000);
let kappingAcrilico = new Service("Manicuria", "Kapping Acrilico", 90, 7000);
let esculpidasAcrilico = new Service("Manicuria", "Esculpidas en Acrilico", 90, 8000);

const serviciosManicuria = [esmaltadoSemipermanente, kappingGel, kappingAcrilico, esculpidasAcrilico];

const listaServicios = serviciosCosmetologia.concat(serviciosManicuria);

// CONSTRUCCION DEL CALENDARIO
// Lo habia hecho a mano en el HTML numero por numero, despues se me ocurrio hacerlo asi para que no quede tan largo

function crearElemento(tag, clase, contenido) {
    var elemento = document.createElement(tag);
    elemento.className = clase;
    elemento.innerHTML = contenido;
    return elemento;
}

var diasSemana = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
var gridCalendario = document.querySelector('.gridCalendario');

// Días de la semana
for (var i = 0; i < diasSemana.length; i++) {
    var dia = crearElemento('article', 'semana d' + (i + 1), '<div><h5>' + diasSemana[i] + '</h5></div>');
    gridCalendario.appendChild(dia);
}

// Días del mes
for (var j = 1; j <= 31; j++) {
    var diaMes = crearElemento('article', 'box boxCal f' + j, '<div><h5>' + j + '</h5></div>');
    gridCalendario.appendChild(diaMes);
}

// 3RA PREENTREGA

document.addEventListener('DOMContentLoaded', () => {
    const servicios = document.getElementById('servicios');

    profesionales.forEach(profesional => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "servicio";
        radio.value = profesional.category.toLowerCase();
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${profesional.category.charAt(0).toUpperCase() + profesional.category.slice(1).toLowerCase()} (${profesional.nameProfessional})`));
        servicios.appendChild(label);
        servicios.appendChild(document.createElement("br"));
    });

    servicios.addEventListener('change', (event) => {
        if (event.target.name === 'servicio') {
            limpiarFondos();
            mostrarTratamientos(event.target.value);
        }
    });
});

function limpiarFondos() {
    const diasDisponibles = document.querySelectorAll('.boxCal');
    diasDisponibles.forEach(dia => {
        dia.classList.remove('fondoVerde', 'fondoRojo');
    });
}

function mostrarTratamientos(servicio) {
    const tratamientosDiv = document.getElementById("tratamientos");
    tratamientosDiv.innerHTML = "<br>";

    let tratamientos = (servicio === "cosmetologia") ? serviciosCosmetologia : (servicio === "manicuria") ? serviciosManicuria : [];

    const selectTratamientos = document.createElement("select");
    selectTratamientos.name = "tratamiento";
    selectTratamientos.id = "tratamiento";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Seleccione un tratamiento";
    selectTratamientos.appendChild(defaultOption);

    tratamientos.forEach(tratamiento => {
        const option = document.createElement("option");
        option.value = tratamiento.nameService;
        option.text = `${tratamiento.nameService} (${tratamiento.durationMinutes} min - $${tratamiento.price})`;
        selectTratamientos.appendChild(option);
    });

    tratamientosDiv.appendChild(selectTratamientos);

    selectTratamientos.addEventListener('change', (event) => {
        if (event.target.value) {
            marcarDiasDisponibles(event.target.value, servicio);
        }
    });

    // Limpiar horarios disponibles cuando se selecciona otro tipo de servicio
    document.getElementById("horariosDisponibles").innerHTML = '';
    document.getElementById("fechaSeleccionada").textContent = '';
}

function marcarDiasDisponibles(tratamiento, servicio) {
    const diasDisponibles = document.querySelectorAll('.boxCal');

    // Limpiar las clases anteriores
    diasDisponibles.forEach(dia => {
        dia.classList.remove('disponible', 'fondoVerde', 'fondoRojo');
    });

    let dias = servicio === "cosmetologia" ? [8] : servicio === "manicuria" ? [19] : [];


    dias.forEach(dia => {
        const diaElement = document.querySelector(`.f${dia}`);
        diaElement.classList.add('disponible');
        const horarios = servicio === "cosmetologia" ? ["10:30", "14:00"] : ["09:00", "13:00", "15:00"];
        const horariosOcupados = JSON.parse(localStorage.getItem('horariosOcupados')) || [];
        const horariosDisponibles = horarios.filter(horario => !horariosOcupados.includes(horario));

        horariosDisponibles.length > 0 ? diaElement.classList.add('fondoVerde') : diaElement.classList.add('fondoRojo');
    });

    diasDisponibles.forEach(dia => {
        dia.addEventListener('click', (event) => {
            if (event.currentTarget.classList.contains('disponible')) {
                mostrarHorarios(event.currentTarget, servicio);
            }
        });
    });
}

function mostrarHorarios(dia, servicio) {
    const fechaTexto = dia.classList.contains('f8') ? "Lunes 8 de Julio" : dia.classList.contains('f19') ? "Viernes 19 de Julio" : "";
    document.getElementById("fechaSeleccionada").textContent = fechaTexto;

    const horariosDisponibles = document.getElementById("horariosDisponibles");
    horariosDisponibles.innerHTML = '';
    let horarios = [];

    if (servicio === "cosmetologia" && dia.classList.contains('f8')) {
        horarios = ["10:30", "14:00"];
    } else if (servicio === "manicuria" && dia.classList.contains('f19')) {
        horarios = ["09:00", "13:00", "15:00"];
    }

    const horariosOcupados = JSON.parse(localStorage.getItem('horariosOcupados')) || [];

    horarios.forEach(horario => {
        const p = document.createElement('p');
        p.textContent = horario;
        p.classList.add('horario-disponible');

        if (horariosOcupados.includes(horario)) {
            p.classList.add('ocupado');
            p.style.textDecoration = "line-through";
            p.style.color = "red";
        }

        horariosDisponibles.appendChild(p);

        p.addEventListener('click', () => {
            if (p.classList.contains('ocupado')) {
                return;
            }
            confirmarTurno(p, horario);
        });
    });
}

function obtenerTratamientoSeleccionado() {
    const tratamientoSelect = document.getElementById('tratamiento');
    const index = tratamientoSelect.selectedIndex;
    const selectedOption = tratamientoSelect.options[index];
    const tratamientoSeleccionado = selectedOption.value;
    return listaServicios.find(tratamiento => tratamiento.nameService === tratamientoSeleccionado);
}

// CONFIRMACION DEL TURNO

function confirmarTurno(elementoHorario, horario) {
    Swal.fire({
        title: 'Confirmar Turno',
        html: `¿Desea reservar el turno del <b>${document.getElementById("fechaSeleccionada").textContent}</b> a las <b>${horario}hs</b> para <b>${obtenerTratamientoSeleccionado().nameService}</b>? <br> Deberá abonar una seña de <b>$${obtenerTratamientoSeleccionado().deposit}.-</b>?`,
        color: '#c0c0c0',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Turno Reservado!',
                html: `Se ha reservado el turno para las <b>${horario}hs</b>.`,
                color: '#c0c0c0',
                icon: 'success'
            });
            marcarHorarioOcupado(elementoHorario);
            guardarHorarioOcupado(horario);
        }
    });
}


function marcarHorarioOcupado(elementoHorario) {
    elementoHorario.style.textDecoration = "line-through";
    elementoHorario.style.color = "red";
    elementoHorario.classList.add('ocupado');
}

function guardarHorarioOcupado(horario) {
    const horariosOcupados = JSON.parse(localStorage.getItem('horariosOcupados')) || [];
    horariosOcupados.push(horario);
    localStorage.setItem('horariosOcupados', JSON.stringify(horariosOcupados));
}
