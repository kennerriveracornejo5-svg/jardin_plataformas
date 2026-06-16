// ===============================
// MENÚ RESPONSIVE
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Cambiar icono
  if (navLinks.classList.contains("active")) {
    menuToggle.innerHTML = "✖";
  } else {
    menuToggle.innerHTML = "☰";
  }
});

// ===============================
// CERRAR MENÚ AL HACER CLICK
// ===============================

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    // Volver al icono hamburguesa
    menuToggle.innerHTML = "☰";
  });
});

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));

    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
// ===============================
// FICHAS DE PLANTAS
// ===============================

const plantasInfo = {
  lechuga: {
    titulo: "🥬 Lechuga",
    contenido: `
      <p><strong>Nombre científico:</strong> Lactuca sativa</p>

      <p><strong>Tiempo de crecimiento:</strong> 45 a 60 días</p>

      <p><strong>Beneficios:</strong></p>

      <ul>
        <li>Rica en fibra</li>
        <li>Favorece la digestión</li>
        <li>Baja en calorías</li>
      </ul>
    `,
  },

  acelga: {
    titulo: "🌿 Acelga",
    contenido: `
      <p><strong>Nombre científico:</strong> Beta vulgaris</p>

      <p><strong>Tiempo de crecimiento:</strong> 50 a 70 días</p>

      <ul>
        <li>Rica en hierro</li>
        <li>Contiene vitaminas A y C</li>
        <li>Fácil de cultivar</li>
      </ul>
    `,
  },

  oregano: {
    titulo: "🌱 Orégano",
    contenido: `
      <p><strong>Nombre científico:</strong> Origanum vulgare</p>

      <p><strong>Uso:</strong> Condimento y planta medicinal</p>

      <ul>
        <li>Aroma intenso</li>
        <li>Propiedades antioxidantes</li>
        <li>Muy resistente</li>
      </ul>
    `,
  },

  manzanilla: {
    titulo: "🌼 Manzanilla",
    contenido: `
      <p><strong>Nombre científico:</strong> Matricaria chamomilla</p>

      <ul>
        <li>Ayuda a la digestión</li>
        <li>Propiedades relajantes</li>
        <li>Uso medicinal tradicional</li>
      </ul>
    `,
  },

  cebolla: {
    titulo: "🧅 Cebolla",
    contenido: `
      <p><strong>Nombre científico:</strong> Allium cepa</p>

      <ul>
        <li>Rica en antioxidantes</li>
        <li>Muy utilizada en la cocina</li>
        <li>Favorece la salud cardiovascular</li>
      </ul>
    `,
  },

  rocoto: {
    titulo: "🌶️ Rocoto",
    contenido: `
      <p><strong>Nombre científico:</strong> Capsicum pubescens</p>

      <ul>
        <li>Ají tradicional peruano</li>
        <li>Alto contenido de vitamina C</li>
        <li>Sabor picante característico</li>
      </ul>
    `,
  },
};

// Elementos

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalInfo = document.getElementById("modalInfo");
const cerrarModal = document.getElementById("cerrarModal");

// Abrir modal

document.querySelectorAll(".planta").forEach((planta) => {
  planta.addEventListener("click", () => {
    const nombre = planta.dataset.planta;

    modalTitulo.innerHTML = plantasInfo[nombre].titulo;
    modalInfo.innerHTML = plantasInfo[nombre].contenido;

    modal.style.display = "flex";
  });
});

// Cerrar modal

cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar al hacer clic fuera

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// ===============================
// CURIOSIDADES ECOLÓGICAS
// ===============================

const curiosidades = [
  "🌱 Una planta de lechuga está compuesta por más del 90% de agua.",

  "🌿 El compostaje puede reducir significativamente los residuos orgánicos del hogar.",

  "🌎 Los biohuertos ayudan a mejorar la calidad del aire en los espacios urbanos.",

  "☀️ La mayoría de las hortalizas necesitan entre 4 y 6 horas de sol al día.",

  "💧 Regar temprano por la mañana reduce la evaporación del agua.",

  "🌱 Las plantas ayudan a disminuir la temperatura del ambiente.",

  "🪱 Las lombrices mejoran la fertilidad del suelo de forma natural.",

  "🌾 Un suelo saludable contiene millones de microorganismos beneficiosos.",

  "🍃 Las plantas absorben dióxido de carbono y liberan oxígeno.",

  "🌻 Cultivar alimentos en casa promueve hábitos de vida más saludables.",

  "🥬 La lechuga puede crecer completamente en menos de 60 días.",

  "🌧️ El agua de lluvia puede utilizarse para regar cultivos de forma sostenible.",
];

const curiosidadTexto = document.getElementById("curiosidad-texto");

const botonCuriosidad = document.getElementById("nueva-curiosidad");

function mostrarCuriosidad() {
  const indice = Math.floor(Math.random() * curiosidades.length);

  curiosidadTexto.textContent = curiosidades[indice];
}

// Ejecutar al cargar
mostrarCuriosidad();

// Cambiar al hacer clic
botonCuriosidad.addEventListener("click", mostrarCuriosidad);

// ===============================
// CLIMA HUANCAYO - OPEN METEO
// ===============================

async function obtenerClima() {
  try {
    const respuesta = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-12.0651&longitude=-75.2049&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
    );

    const datos = await respuesta.json();

    const temperatura = datos.current.temperature_2m;
    const humedad = datos.current.relative_humidity_2m;
    const viento = datos.current.wind_speed_10m;

    let mensaje = "";

    if (temperatura >= 20) {
      mensaje = "☀️ Excelente clima para el crecimiento de las plantas.";
    } else if (temperatura >= 15) {
      mensaje = "🌱 Condiciones favorables para el biohuerto.";
    } else {
      mensaje = "🥶 Temperatura baja, monitorear cultivos sensibles.";
    }

    document.getElementById("clima-info").innerHTML = `

      <p>📍 Huancayo, Perú</p>

      <p>🌡️ Temperatura: <strong>${temperatura}°C</strong></p>

      <p>💧 Humedad: <strong>${humedad}%</strong></p>

      <p>🌬️ Viento: <strong>${viento} km/h</strong></p>

      <div class="mensaje-cultivo">
        ${mensaje}
      </div>

    `;
  } catch (error) {
    document.getElementById("clima-info").innerHTML = `
      <p>❌ No se pudo obtener el clima.</p>
    `;

    console.error(error);
  }
}

obtenerClima();
