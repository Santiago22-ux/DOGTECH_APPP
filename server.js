const registroForm = document.getElementById('registroForm');
const mensajeError = document.getElementById('mensajeError');

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Ocultar mensaje previo al intentar de nuevo
  mensajeError.style.display = 'none';
  mensajeError.textContent = '';

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://dogtech-appp.onrender.com/api/auth/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Si el servidor responde con 400 (correo en uso, datos inválidos, etc.)
      mensajeError.style.color = '#ff4d4d'; // Rojo para error
      
      // Si el backend te devuelve un mensaje tipo "El correo ya está registrado"
      // o personalizas el texto directamente si el código es 400:
      mensajeError.textContent = data.mensaje || 'El correo electrónico ya está en uso';
      mensajeError.style.display = 'block';
      return;
    }

    // Si todo sale bien (Código 200 / 201)
    mensajeError.style.color = '#28a745'; // Verde para éxito
    mensajeError.textContent = '¡Usuario registrado con éxito!';
    mensajeError.style.display = 'block';

    // Opcional: Redirigir al login después de 2 segundos
    /* setTimeout(() => {
         window.location.href = 'login.html';
       }, 2000); 
    */

  } catch (error) {
    mensajeError.style.color = '#ff4d4d';
    mensajeError.textContent = 'Error de conexión con el servidor.';
    mensajeError.style.display = 'block';
  }
});