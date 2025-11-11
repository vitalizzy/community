// ============================================================================
// REGISTRO DE USUARIOS - L2H Community
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const alertDiv = document.getElementById('alert');
    const submitButton = registerForm.querySelector('button[type="submit"]');

    // Validar formulario en tiempo real para habilitar/deshabilitar botón
    const requiredFields = [
        'name',
        'email',
        'password',
        'confirmPassword',
        'bloque',
        'portal',
        'planta',
        'letra',
        'tipo',
        'gdprAccept'
    ];

    // Función para verificar si todos los campos están completos
    function checkFormCompletion() {
        let allFilled = true;

        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            
            if (!field) continue;

            if (field.type === 'checkbox') {
                if (!field.checked) {
                    allFilled = false;
                    break;
                }
            } else {
                const value = field.value.trim();
                if (!value) {
                    allFilled = false;
                    break;
                }
            }
        }

        // Habilitar/deshabilitar botón según el estado
        submitButton.disabled = !allFilled;
    }

    // Añadir listeners a todos los campos para validar en tiempo real
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.type === 'checkbox') {
                field.addEventListener('change', checkFormCompletion);
            } else {
                field.addEventListener('input', checkFormCompletion);
                field.addEventListener('change', checkFormCompletion);
            }
        }
    });

    // Verificación inicial
    checkFormCompletion();

    // Manejar envío del formulario
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar mensajes anteriores
        hideAlert();
        
        // Validar campos
        if (!validateForm()) {
            return;
        }

        // Deshabilitar botón mientras se procesa
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            await registerUser();
        } catch (error) {
            showAlert('error', 'Error inesperado al registrar. Por favor, inténtalo de nuevo.');
            console.error('Error en registro:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });

    // Función para validar el formulario
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const bloque = document.getElementById('bloque').value;
        const portal = document.getElementById('portal').value;
        const planta = document.getElementById('planta').value;
        const letra = document.getElementById('letra').value;
        const tipo = document.getElementById('tipo').value;
        const gdprAccept = document.getElementById('gdprAccept').checked;

        // Validar nombre
        if (name.length < 3) {
            showAlert('error', 'El nombre debe tener al menos 3 caracteres');
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('error', 'Por favor, introduce un correo electrónico válido');
            return false;
        }

        // Validar contraseña
        if (password.length < 6) {
            showAlert('error', 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            showAlert('error', 'Las contraseñas no coinciden');
            document.getElementById('confirmPasswordError').classList.add('show');
            return false;
        }

        // Validar campos de ubicación (OBLIGATORIOS)
        if (!bloque) {
            showAlert('error', 'Debes seleccionar el bloque');
            return false;
        }

        if (!portal) {
            showAlert('error', 'Debes seleccionar el portal');
            return false;
        }

        if (!planta) {
            showAlert('error', 'Debes seleccionar la planta');
            return false;
        }

        if (!letra) {
            showAlert('error', 'Debes seleccionar la letra');
            return false;
        }

        if (!tipo) {
            showAlert('error', 'Debes seleccionar el tipo de propietario');
            return false;
        }

        // Validar aceptación de GDPR
        if (!gdprAccept) {
            showAlert('error', 'Debes aceptar la Política de Privacidad');
            document.getElementById('gdprError').classList.add('show');
            return false;
        }

        return true;
    }

    // Función principal de registro
    async function registerUser() {
        const formData = {
            nombre: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            bloque: document.getElementById('bloque').value,
            portal: document.getElementById('portal').value,
            planta: document.getElementById('planta').value,
            letra: document.getElementById('letra').value,
            tipo_propietario: document.getElementById('tipo').value,
            telefono: document.getElementById('telefono')?.value.trim() || null
        };

        try {
            // 1. Registrar usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        nombre: formData.nombre,
                        bloque: formData.bloque,
                        portal: formData.portal,
                        planta: formData.planta,
                        letra: formData.letra
                    }
                }
            });

            if (authError) {
                console.error('Error en auth.signUp:', authError);
                
                // Mensajes de error personalizados
                if (authError.message.includes('already registered')) {
                    showAlert('error', 'Este correo electrónico ya está registrado');
                } else if (authError.message.includes('invalid email')) {
                    showAlert('error', 'El correo electrónico no es válido');
                } else if (authError.message.includes('weak password')) {
                    showAlert('error', 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres');
                } else {
                    showAlert('error', `Error al registrar: ${authError.message}`);
                }
                return;
            }

            console.log('Usuario auth creado:', authData);

            // 2. Insertar datos del propietario en la tabla
            const { data: propietarioData, error: propietarioError } = await supabase
                .from('propietarios')
                .insert([
                    {
                        user_id: authData.user.id,
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        bloque: formData.bloque,
                        portal: formData.portal,
                        planta: formData.planta,
                        letra: formData.letra,
                        tipo_propietario: formData.tipo_propietario
                    }
                ])
                .select();

            if (propietarioError) {
                console.error('Error al insertar propietario:', propietarioError);
                showAlert('error', `Error al guardar datos: ${propietarioError.message}`);
                return;
            }

            console.log('Datos de propietario guardados:', propietarioData);

            // 3. Mostrar mensaje de éxito
            showAlert('success', '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
            
            // 4. Limpiar formulario
            registerForm.reset();

            // 5. Redirigir al login después de 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            console.error('Error inesperado:', error);
            showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
        }
    }

    // Funciones auxiliares para mostrar/ocultar alertas
    function showAlert(type, message) {
        alertDiv.textContent = message;
        alertDiv.className = `alert alert-${type} show`;
        
        // Auto-ocultar después de 5 segundos para mensajes de error
        if (type === 'error') {
            setTimeout(hideAlert, 5000);
        }
    }

    function hideAlert() {
        alertDiv.className = 'alert';
        alertDiv.textContent = '';
    }

    // Validación en tiempo real de confirmación de contraseña
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (confirmPassword && password !== confirmPassword) {
            errorElement.classList.add('show');
        } else {
            errorElement.classList.remove('show');
        }
    });

    // Indicador de fuerza de contraseña
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const strengthBar = document.querySelector('.password-strength-bar');
        const strengthContainer = document.getElementById('passwordStrength');
        
        if (!password) {
            strengthContainer.classList.remove('show');
            return;
        }
        
        strengthContainer.classList.add('show');
        
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        strengthBar.className = 'password-strength-bar';
        if (strength <= 2) {
            strengthBar.classList.add('weak');
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    });
});
