// ============================================================================
// LOGIN DE USUARIOS - L2H Community
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const alertDiv = document.getElementById('alert');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;

    // Abort if the form cannot operate correctly.
    if (!loginForm || !alertDiv || !submitButton || !emailInput || !passwordInput) {
        console.error('Login: elementos requeridos no encontrados. Abortando inicialización.');
        return;
    }

    const supabaseClient = window.supabaseClient ?? (typeof supabase !== 'undefined' ? supabase : null);
    const authHelpers = {
        checkAuth: typeof window.checkAuth === 'function' ? window.checkAuth : null,
        getCurrentUser: typeof window.getCurrentUser === 'function' ? window.getCurrentUser : null,
        getPropietarioData: typeof window.getPropietarioData === 'function' ? window.getPropietarioData : null,
        logout: typeof window.logout === 'function' ? window.logout : null
    };

    const missingHelpers = Object.entries(authHelpers)
        .filter(([, fn]) => typeof fn !== 'function')
        .map(([name]) => name);

    if (!supabaseClient || missingHelpers.length) {
        console.error('Login: dependencias faltantes ->', {
            supabaseDisponible: Boolean(supabaseClient),
            helpersFaltantes: missingHelpers
        });
        showAlert('error', 'Servicio de autenticación no disponible. Inténtalo más tarde.');
        return;
    }

    const { checkAuth, getCurrentUser, getPropietarioData, logout } = authHelpers;

    // Mostrar notificaciones flotantes desde sessionStorage si existen
    showNotificationFromSession();

    // Verificar si hay un token de confirmación de email en la URL
    handleEmailConfirmation().catch(error => {
        console.error('Error procesando confirmación de email:', error);
        showAlert('error', 'No se pudo validar el enlace de confirmación. Inicia sesión manualmente.');
    });

    // Verificar si el usuario ya está autenticado
    checkIfAlreadyLoggedIn();

    // Manejar envío del formulario
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar mensajes anteriores
        hideAlert();
        
        // Obtener datos del formulario
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validar campos
        if (!email || !password) {
            showAlert('error', 'Por favor, completa todos los campos');
            return;
        }

        // Deshabilitar botón mientras se procesa
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            await loginUser(email, password);
        } catch (error) {
            showAlert('error', 'Error inesperado al iniciar sesión. Por favor, inténtalo de nuevo.');
            console.error('Error en login:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });

    // Manejar confirmación de email desde el link
    async function handleEmailConfirmation() {
        // Verificar si hay parámetros de confirmación en la URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (accessToken && type === 'signup') {
            showAlert('success', '✅ Email confirmado correctamente. Redirigiendo al dashboard...');
            
            // Limpiar la URL
            window.history.replaceState(null, '', window.location.pathname);
            
            // La sesión ya debería estar activa, redirigir al dashboard
            setTimeout(async () => {
                try {
                    const { data, error } = await supabaseClient.auth.getUser();
                    if (error) {
                        console.error('Confirmación: error recuperando usuario:', error);
                        showAlert('error', 'No se pudo verificar tu sesión. Inicia sesión manualmente.');
                        return;
                    }
                    if (data?.user) {
                        window.location.href = 'dashboard.html';
                    }
                } catch (err) {
                    console.error('Confirmación: error inesperado al redirigir:', err);
                }
            }, 2000);
        } else if (type === 'recovery') {
            showAlert('info', 'Recuperación de contraseña. Introduce tu nueva contraseña.');
        }
    }

    // Verificar si ya hay sesión activa
    async function checkIfAlreadyLoggedIn() {
        try {
            const session = await checkAuth();
            if (!session) {
                return; // No hay sesión, continuar normal
            }

            // Verificar que el usuario realmente existe
            const user = await getCurrentUser();
            if (user) {
                // Usuario válido con sesión activa, redirigir
                window.location.href = 'dashboard.html';
            } else {
                // Sesión existe pero usuario no válido, limpiar
                console.log('Sesión inválida detectada, limpiando...');
                await logout();
            }
        } catch (error) {
            console.error('Error verificando sesión:', error);
            // Si hay error, limpiar sesión por seguridad
            await logout();
        }
    }

    // Función principal de login
    async function loginUser(email, password) {
        try {
            // Intentar iniciar sesión con Supabase Auth
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error('Error en signInWithPassword:', error);
                const userMessage = mapAuthErrorToMessage(error);
                showAlert('error', userMessage);
                return; // IMPORTANTE: Detener ejecución aquí
            }

            // Verificar que tenemos usuario y sesión válidos
            if (!data || !data.user || !data.session) {
                showAlert('error', 'Error al iniciar sesión. No se pudo crear la sesión.');
                return;
            }

            console.log('Login exitoso - verificando usuario:', data);

            // Verificar que el usuario realmente existe en la base de datos
            const userExists = await getCurrentUser();
            if (!userExists) {
                console.error('Usuario no existe en la base de datos');
                showAlert('error', 'Usuario no encontrado. Por favor, contacta al administrador.');
                // Limpiar sesión sin redirigir
                await supabaseClient.auth.signOut();
                clearSessionData();
                return;
            }

            // Obtener datos adicionales del propietario
            const propietarioData = await getPropietarioData(data.user.id);
            
            if (!propietarioData) {
                console.error('No se encontraron datos del propietario para user_id:', data.user.id);
                showAlert('error', 'No se encontraron datos de tu perfil. Contacta al administrador.');
                // Limpiar sesión sin redirigir
                await supabaseClient.auth.signOut();
                clearSessionData();
                return;
            }

            // TODO VALIDADO - Ahora sí proceder con el login
            console.log('Validación completa - propietario:', propietarioData);

            // Guardar datos en sessionStorage
            try {
                sessionStorage.setItem('user', JSON.stringify(data.user));
                sessionStorage.setItem('propietario', JSON.stringify(propietarioData));
            } catch (storageError) {
                console.warn('No se pudieron almacenar los datos en sessionStorage:', storageError);
            }

            // Mostrar mensaje de éxito SOLO cuando todo está OK
            showAlert('success', '¡Bienvenido a L2H!');

            // Redirigir al dashboard después de 1 segundo
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            console.error('Error inesperado en loginUser:', error);
            showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
        }
    }

    // Funciones auxiliares para mostrar/ocultar alertas
    function showAlert(type, message) {
        if (!alertDiv) {
            console.warn('No se pudo mostrar la alerta porque el contenedor no existe.');
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

    function showFloatingNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `floating-notification notification-${type}`;
        
        const iconMap = {
            error: 'exclamation-circle',
            success: 'check-circle',
            info: 'info-circle'
        };
        
        const iconClass = iconMap[type] || 'info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${iconClass}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    function showNotificationFromSession() {
        try {
            const notificationData = sessionStorage.getItem('loginNotification');
            if (notificationData) {
                const notification = JSON.parse(notificationData);
                if (notification && notification.type && notification.message) {
                    showFloatingNotification(notification.type, notification.message);
                }
                // Limpiar la notificación del sessionStorage
                sessionStorage.removeItem('loginNotification');
            }
        } catch (error) {
            console.warn('Error al mostrar notificación de sesión:', error);
        }
    }

    // Limpiar errores al escribir
    emailInput.addEventListener('input', hideAlert);
    passwordInput.addEventListener('input', hideAlert);

    function clearSessionData() {
        try {
            sessionStorage.clear();
        } catch (storageError) {
            console.warn('No se pudo limpiar sessionStorage:', storageError);
        }
    }

    function mapAuthErrorToMessage(error) {
        if (!error) {
            return 'No se pudo iniciar sesión. Inténtalo nuevamente.';
        }

        const rawMessage = (error.message || '').toLowerCase();
        const status = error.status;

        if (rawMessage.includes('invalid login credentials') || status === 400) {
            return 'Correo electrónico o contraseña incorrectos';
        }

        if (rawMessage.includes('email not confirmed')) {
            return 'Por favor, confirma tu correo electrónico antes de iniciar sesión';
        }

        if (rawMessage.includes('identity is blocked') || rawMessage.includes('account is blocked')) {
            return 'Tu cuenta está temporalmente bloqueada. Revisa tu correo o contacta al administrador.';
        }

        if (rawMessage.includes('over request rate limit') || rawMessage.includes('rate limit')) {
            return 'Demasiados intentos. Espera un momento antes de volver a intentarlo.';
        }

        if (error.code === '429' || status === 429) {
            return 'Demasiados intentos en poco tiempo. Intenta de nuevo más tarde.';
        }

        return 'No se pudo iniciar sesión. Inténtalo nuevamente más tarde.';
    }
});
