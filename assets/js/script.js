
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const alertTrigger = document.getElementById('liveAlertBtn');

    function showAlert(message, type) {
      // Eliminar cualquier alerta anterior
      alertPlaceholder.innerHTML = '';

      // Crear nueva alerta
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      `;

      alertPlaceholder.append(wrapper);
    }

    alertTrigger.addEventListener('click', () => {
      showAlert('Guardado exitosamente', 'success');
    });