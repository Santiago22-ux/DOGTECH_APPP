// Detecta la URL base automáticamente (funciona tanto en local como en Render)
const API_URL = window.location.origin;

// ==========================================
// 1. REGISTRO DE USUARIO
// ==========================================
document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const msgDiv = document.getElementById('msg-registro');

    msgDiv.style.color = '#555';
    msgDiv.innerText = 'Cargando...';

    try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            msgDiv.style.color = 'green';
            msgDiv.innerText = data.message || '¡Registro exitoso!';
            document.getElementById('form-registro').reset();
        } else {
            msgDiv.style.color = 'red';
            msgDiv.innerText = data.message || 'Error en el registro';
        }
    } catch (error) {
        console.error('Error:', error);
        msgDiv.style.color = 'red';
        msgDiv.innerText = 'Error de conexión con el servidor';
    }
});

// ==========================================
// 2. INICIO DE SESIÓN (LOGIN)
// ==========================================
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msgDiv = document.getElementById('msg-login');

    msgDiv.style.color = '#555';
    msgDiv.innerText = 'Validando...';

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            msgDiv.style.color = 'green';
            msgDiv.innerText = `¡Bienvenido, ${data.user.nombre}!`;
            
            // Guardar usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Si tienes un dashboard.html, descomenta la siguiente línea:
            // window.location.href = 'dashboard.html';
        } else {
            msgDiv.style.color = 'red';
            msgDiv.innerText = data.message || 'Credenciales incorrectas';
        }
    } catch (error) {
        console.error('Error:', error);
        msgDiv.style.color = 'red';
        msgDiv.innerText = 'Error de conexión con el servidor';
    }
});