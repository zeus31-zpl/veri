/* =====================================
   RCVER LOGIN - VERSION FUNCIONAL
===================================== */

function loginRCVER() {

    const usuario = document.getElementById("user").value.trim();
    const clave = document.getElementById("pass").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (usuario === "zeus" && clave === "1234") {

        mensaje.innerHTML = "✅ Acceso autorizado";
        mensaje.className = "text-success text-center fw-bold";

        // guardar sesión
        sessionStorage.setItem("loginActivo", "true");

        setTimeout(() => {
            window.location.href = "consulta.html";
        }, 500);

    } else {

        mensaje.innerHTML = "❌ Usuario o clave incorrectos";
        mensaje.className = "text-danger text-center fw-bold";
    }
}