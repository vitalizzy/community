// ============================================================================
// CAMBIO DE CONTRASEÑA - L2H Community
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const alertDiv = document.getElementById('alert');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const changeBtn = document.getElementById('changeBtn');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    const supabaseClient = window.supabaseClient ?? (typeof supabase !== 'undefined' ? supabase : null);

    if (!changePasswordForm || !alertDiv || !supabaseClient) {
        console.error('Change Password: elementos requeridos no encontrados.');
        return;
    }

    // Toggle visibilidad de contraseña
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Validar fortaleza de contraseña en tiempo real
    newPasswordInput.addEventListener('input', function() {
        validatePasswordStrength(this.value);
        hideAlert();
    });

    confirmPasswordInput.addEventListener('input', hideAlert);

    // Manejar envío del formulario
    changePasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        hideAlert();
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validaciones
        if (!newPassword || !confirmPassword) {
            showAlert('error', 'Por favor, completa todos los campos');
            return;
        }

        if (!validatePassword(newPassword)) {
            showAlert('error', 'La contraseña no cumple con los requisitos');
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert('error', 'Las contraseñas no coinciden');
            return;
        }

        // Deshabilitar botón mientras se procesa
        changeBtn.disabled = true;
        changeBtn.classList.add('loading');
        showAlert('info', 'Cambiando contraseña...');

        try {
            // Cambiar contraseña en Supabase
            const { error } = await supabaseClient.auth.updateUser({
                password: newPassword
            });

            if (error) {
                console.error('Error cambiando contraseña:', error);
                showAlert('error', `Error: ${error.message}`);
                return;
            }

            // Mostrar mensaje de éxito
            showAlert('success', '¡Contraseña cambiada correctamente!');
            
            // Limpiar formulario
            changePasswordForm.reset();
            resetPasswordStrength();

            // Redirigir al dashboard después de 2 segundos
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);

        } catch (error) {
            console.error('Error inesperado:', error);
            showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
            changeBtn.disabled = false;
            changeBtn.classList.remove('loading');
        }
    });

    // Función para validar fortaleza de contraseña
    function validatePasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const reqLength = document.getElementById('req-length');
        const reqUpper = document.getElementById('req-upper');
        const reqLower = document.getElementById('req-lower');
        const reqNumber = document.getElementById('req-number');

        // Criterios
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        // Actualizar iconos de requisitos
        updateRequirement(reqLength, hasLength);
        updateRequirement(reqUpper, hasUpper);
        updateRequirement(reqLower, hasLower);
        updateRequirement(reqNumber, hasNumber);

        // Calcular fortaleza
        const met = [hasLength, hasUpper, hasLower, hasNumber].filter(Boolean).length;

        // Actualizar barra de fortaleza
        strengthBar.className = 'strength-bar';
        if (met === 0) {
            strengthBar.style.width = '0%';
        } else if (met === 1 || met === 2) {
            strengthBar.classList.add('weak');
        } else if (met === 3) {
            strengthBar.classList.add('medium');
        } else if (met === 4) {
            strengthBar.classList.add('strong');
        }
    }

    // Función para actualizar requisitos
    function updateRequirement(element, isMet) {
        if (isMet) {
            element.classList.remove('pending');
            element.classList.add('met');
        } else {
            element.classList.remove('met');
            element.classList.add('pending');
        }
    }

    // Función para resetear fortaleza
    function resetPasswordStrength() {
        const strengthBar = document.getElementById('strengthBar');
        const requirements = document.querySelectorAll('[id^="req-"]');

        strengthBar.className = 'strength-bar';
        strengthBar.style.width = '0%';

        requirements.forEach(req => {
            req.classList.remove('met');
            req.classList.add('pending');
        });
    }

    // Función para validar contraseña
    function validatePassword(password) {
        if (password.length < 8) return false;
        if (!/[A-Z]/.test(password)) return false;
        if (!/[a-z]/.test(password)) return false;
        if (!/[0-9]/.test(password)) return false;
        return true;
    }

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
});
