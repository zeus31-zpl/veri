/* =====================================
   RCVER - CONSULTA VEHICULAR
   Versión simplificada: búsqueda solo con botón
===================================== */

/* BLOQUEAR SI NO HAY LOGIN */
if (sessionStorage.getItem("loginActivo") !== "true") {
    window.location.href = "index.html";
}

let vehiculos = [];
let datosCargados = false;

/* =========================
   CARGAR JSON (vehiculos + vehiculos1)
========================= */
function cargarVehiculos() {
    Promise.all([
        fetch("vehiculos.json").then(r => r.json()),
        fetch("vehiculos1.json").then(r => r.json())
    ])
    .then(([data1, data2]) => {
        const todos = [...data1, ...data2]; // unimos ambos arrays

        vehiculos = todos
            .filter(v => v && v.DOMINIO)
            .map(v => ({
                dominio: String(v.DOMINIO || "").toLowerCase().replace(/[-\s]/g,""),
                marca: v.MARCA || "SIN DATOS",
                modelo: v.MODELO || "SIN DATOS",
                color: v.COLOR || "SIN DATOS",
                motor: String(v["N° DE MOTOR"] || "").toLowerCase().replace(/[-\s]/g,""),
                chasis: String(v["N° DE CHASIS"] || "").toLowerCase().replace(/[-\s]/g,""),
                estado: v.CRIA || "SIN DATOS"
            }));

        datosCargados = true;
        console.log("✅ JSON cargados:", vehiculos.length);
    })
    .catch(error => console.error("❌ Error cargando JSON:", error));
}

/* =========================
   BUSCAR VEHÍCULO (solo botón)
========================= */
function buscarVehiculo() {
    const texto = document.getElementById("busqueda")
        .value
        .trim()
        .toLowerCase()
        .replace(/[-\s]/g,"");

    const resultado = document.getElementById("resultado");

    if (!datosCargados) {
        resultado.innerHTML = "⏳ Cargando base...";
        return;
    }

    if (!texto) {
        resultado.innerHTML = "Ingrese un dato para buscar";
        return;
    }

    const encontrado = vehiculos.find(v =>
        v.dominio === texto ||
        v.motor === texto ||
        v.chasis === texto
    );

    if (encontrado) {
        resultado.innerHTML = `
            <div class="card text-dark bg-success mb-3 p-3">
                <h5>✅ VEHÍCULO CON PEDIDO</h5>
                <p>
                    Marca: ${encontrado.marca}<br>
                    Modelo: ${encontrado.modelo}<br>
                    Color: ${encontrado.color}<br>
                    Dominio: ${encontrado.dominio.toUpperCase()}<br>
                    Estado: ${encontrado.estado}
                </p>
            </div>
        `;
    } else {
        resultado.innerHTML = `
            <div class="card text-white bg-danger mb-3 p-3">
                ❌ SIN PEDIDO DE SECUESTRO
            </div>
        `;
    }
}

/* =========================
   INICIO
========================= */
document.addEventListener("DOMContentLoaded", () => {
    cargarVehiculos();

    // Buscar solo con botón
    document
        .getElementById("btnBuscar")
        .addEventListener("click", buscarVehiculo);

    // Cerrar sesión
    document
        .getElementById("btnCerrar")
        .addEventListener("click", () => {
            sessionStorage.removeItem("loginActivo");
            window.location.href = "index.html";
        });
});