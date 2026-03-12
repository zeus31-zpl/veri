/* =====================================
   RCVER - CONSULTA VEHICULAR
===================================== */

/* BLOQUEAR SI NO HAY LOGIN */
if (sessionStorage.getItem("loginActivo") !== "true") {
    window.location.href = "index.html";
}

let vehiculos = [];
let datosCargados = false;


/* =========================
   CARGAR JSON
========================= */
function cargarVehiculos() {

    fetch("vehiculos.json")
        .then(response => response.json())
        .then(data => {

            vehiculos = data
                .filter(v => v && v.DOMINIO)
                .map(v => ({

                    dominio: String(v.DOMINIO)
                        .toLowerCase()
                        .replace(/[-\s]/g,""),

                    marca: v.MARCA || "SIN DATOS",
                    modelo: v.MODELO || "SIN DATOS",
                    color: v.COLOR || "SIN DATOS",

                    motor: String(v["N° DE MOTOR"] || "")
                        .toLowerCase()
                        .replace(/[-\s]/g,""),

                    chasis: String(v["N° DE CHASIS"] || "")
                        .toLowerCase()
                        .replace(/[-\s]/g,""),

                    estado: v.CRIA || "SIN DATOS"
                }));

            datosCargados = true;

            console.log("✅ JSON cargado:", vehiculos.length);
        })
        .catch(error => console.error("❌ Error JSON:", error));
}


/* =========================
   BUSCAR
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
            <div class="text-success">
                ✅ VEHÍCULO CON PEDIDO<br><br>
                Marca: ${encontrado.marca}<br>
                Modelo: ${encontrado.modelo}<br>
                Color: ${encontrado.color}<br>
                Dominio: ${encontrado.dominio.toUpperCase()}<br>
                Estado: ${encontrado.estado}
            </div>
        `;

    } else {

        resultado.innerHTML = `
            <div class="text-danger">
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

    document
        .getElementById("btnBuscar")
        .addEventListener("click", buscarVehiculo);

    document
        .getElementById("btnCerrar")
        .addEventListener("click", () => {
            sessionStorage.removeItem("loginActivo");
            window.location.href = "index.html";
        });

});