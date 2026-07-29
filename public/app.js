const API_URL = 'http://localhost:3000/api';

// --- REGISTRO ---
const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const res = await fetch(`${API_URL}/auth/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });
            const data = await res.json();
            const msg = document.getElementById('msg-registro');
            msg.innerText = data.message;
            msg.style.color = res.ok ? 'green' : 'red';
            if (res.ok) formRegistro.reset();
        } catch (err) {
            console.error(err);
        }
    });
}

// --- LOGIN ---
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            const msg = document.getElementById('msg-login');

            if (res.ok) {
                // Guardar usuario activo en LocalStorage
                localStorage.setItem('dogtech_user', JSON.stringify(data.usuario));
                window.location.href = 'dashboard.html';
            } else {
                msg.innerText = data.message;
                msg.style.color = 'red';
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// --- CREAR CITA ---
const formCita = document.getElementById('form-cita');
if (formCita) {
    formCita.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuario = JSON.parse(localStorage.getItem('dogtech_user'));
        
        const payload = {
            usuario_id: usuario.id,
            nombre_mascota: document.getElementById('mascota').value,
            especie_raza: document.getElementById('especie').value,
            motivo: document.getElementById('motivo').value,
            fecha_cita: document.getElementById('fecha').value
        };

        try {
            const res = await fetch(`${API_URL}/citas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                formCita.reset();
                cargarCitas();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// --- CARGAR CITAS DEL USUARIO ---
async function cargarCitas() {
    const usuario = JSON.parse(localStorage.getItem('dogtech_user'));
    if (!usuario) return;

    try {
        const res = await fetch(`${API_URL}/citas/usuario/${usuario.id}`);
        const data = await res.json();

        if (res.ok) {
            const tbody = document.getElementById('tabla-citas');
            tbody.innerHTML = '';
            data.citas.forEach(cita => {
                const fechaFormat = new Date(cita.fecha_cita).toLocaleString();
                tbody.innerHTML += `
                    <tr>
                        <td>${cita.nombre_mascota}</td>
                        <td>${cita.especie_raza}</td>
                        <td>${cita.motivo}</td>
                        <td>${fechaFormat}</td>
                        <td><strong>${cita.estado}</strong></td>
                    </tr>
                `;
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// --- CERRAR SESIÓN ---
function cerrarSesion() {
    localStorage.removeItem('dogtech_user');
    window.location.href = 'index.html';
}