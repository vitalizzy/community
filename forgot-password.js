// ============================================================================
// RECUPERACIÓN DE CONTRASEÑA - L2H Community
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const recoveryForm = document.getElementById('recoveryEmailForm');
    const alertDiv = document.getElementById('alert');
    const emailInput = document.getElementById('email');
    const sendBtn = document.getElementById('sendBtn');
    const successMessage = document.getElementById('successMessage');
    const recoveryForm_el = document.getElementById('recoveryForm');

    const supabaseClient = window.supabaseClient ?? (typeof supabase !== 'undefined' ? supabase : null);

    if (!recoveryForm || !alertDiv || !supabaseClient) {
        console.error('Recovery: elementos requeridos no encontrados.');
        return;
    }

    // Manejar envío del formulario
    recoveryForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        hideAlert();
        
        const email = emailInput.value.trim();

        // Validar email
        if (!email) {
            showAlert('error', 'Por favor, ingresa tu correo electrónico');
            return;
        }

        // Validar formato de email
        if (!isValidEmail(email)) {
            showAlert('error', 'Por favor, ingresa un correo electrónico válido');
            return;
        }

        // Deshabilitar botón mientras se procesa
        sendBtn.disabled = true;
        sendBtn.classList.add('loading');
        showAlert('info', 'Enviando enlace de recuperación...');

        try {
            // Solicitar link de recuperación en Supabase
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password.html`,
            });

            if (error) {
                console.error('Error enviando link de recuperación:', error);
                
                // Mostrar mensaje de error personalizado
                if (error.message.includes('User not found')) {
                    showAlert('error', 'No encontramos una cuenta con ese correo electrónico');
                } else if (error.message.includes('rate_limit')) {
                    showAlert('error', 'Demasiados intentos. Intenta de nuevo más tarde');
                } else {
                    showAlert('error', `Error: ${error.message}`);
                }
                return;
            }

            // Mostrar mensaje de éxito
            hideAlert();
            recoveryForm_el.style.display = 'none';
            successMessage.classList.add('show');
            showAlert('success', 'Se ha enviado el enlace a tu correo electrónico');

        } catch (error) {
            console.error('Error inesperado:', error);
            showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
            sendBtn.disabled = false;
            sendBtn.classList.remove('loading');
        }
    });

    // Función auxiliar para mostrar alertas
    function showAlert(type, message) {
        if (!alertDiv) {
            return;
        }

        const alertTypes = {
            success: 'alert-success',
            error: 'alert-error',
            info: 'alert-info'
        };

        const normalizedType = alertTypes[type] ? type : 'error';
        alertDiv.textContent = message;
        alertDiv.className = `alert ${alertTypes[normalizedType]} show`;
        
        // Auto-ocultar después de 5 segundos para mensajes de error
        if (normalizedType === 'error') {
            setTimeout(hideAlert, 5000);
        }
    }

    function hideAlert() {
        if (!alertDiv) {
            return;
        }
        alertDiv.className = 'alert';
        alertDiv.textContent = '';
    }

    // Limpiar errores al escribir
    emailInput.addEventListener('input', hideAlert);

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
