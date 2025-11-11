// TESTING HELPER - Funciones para Testing Manual en Console
// Ejecutar en console del navegador durante testing

class TestingHelper {
    constructor() {
        this.testResults = [];
        this.supabase = window.supabaseClient || (typeof supabase !== 'undefined' ? supabase : null);
    }

    // ============================================================
    // UTILIDADES GENERALES
    // ============================================================

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}]`;
        
        switch(type) {
            case 'success':
                console.log(`%c${prefix} ✅ ${message}`, 'color: green; font-weight: bold');
                break;
            case 'error':
                console.error(`%c${prefix} ❌ ${message}`, 'color: red; font-weight: bold');
                break;
            case 'warning':
                console.warn(`%c${prefix} ⚠️ ${message}`, 'color: orange; font-weight: bold');
                break;
            case 'info':
            default:
                console.log(`%c${prefix} ℹ️ ${message}`, 'color: blue; font-weight: bold');
        }
    }

    // ============================================================
    // VERIFICACIONES DE PÁGINA
    // ============================================================

    checkCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.log(`Página actual: ${page}`);
        return page;
    }

    checkIfAuthenticated() {
        const user = this.supabase?.auth?.user?.();
        if (user) {
            this.log(`Usuario autenticado: ${user.email}`, 'success');
            return user;
        } else {
            this.log('No hay usuario autenticado', 'warning');
            return null;
        }
    }

    checkDOMElements(selectors) {
        const results = {};
        for (const [name, selector] of Object.entries(selectors)) {
            const element = document.querySelector(selector);
            results[name] = !!element;
            const status = element ? '✅' : '❌';
            this.log(`${status} ${name} (${selector}): ${element ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
        }
        return results;
    }

    // ============================================================
    // ESCENARIO 1: Verificar Formulario de Registro
    // ============================================================

    testRegisterFormElements() {
        this.log('Escenario 1: Verificando elementos de formulario de registro...');
        
        const elements = {
            'Nombre': '#nombre',
            'Email': '#email',
            'Contraseña': '#password',
            'Confirmar Contraseña': '#confirmPassword',
            'GDPR Checkbox': '#gdprAccept',
            'Botón Registrarse': '#registerBtn',
            'Alerta': '#alert'
        };
        
        return this.checkDOMElements(elements);
    }

    // ============================================================
    // ESCENARIO 2: Verificar Página de Onboarding
    // ============================================================

    testOnboardingPageElements() {
        this.log('Escenario 2: Verificando elementos de onboarding...');
        
        const elements = {
            'Bloque Select': '#bloque',
            'Portal Select': '#portal',
            'Planta Select': '#planta',
            'Letra Select': '#letra',
            'Tipo Select': '#tipo',
            'Botón Agregar': '#addPropertyBtn',
            'Botón Continuar': '#continueBtn',
            'Botón Logout': '#logoutBtn',
            'Contenedor Propiedades': '#propertiesList',
            'Alerta': '#alert'
        };
        
        return this.checkDOMElements(elements);
    }

    // ============================================================
    // ESCENARIO 3: Verificar Dashboard
    // ============================================================

    testDashboardElements() {
        this.log('Escenario 3: Verificando elementos del dashboard...');
        
        const elements = {
            'Trigger Perfil': '#profileMenuTrigger',
            'Drawer Perfil': '#profileDrawer',
            'Nombre Perfil': '#profileName',
            'Email Perfil': '#profileTriggerEmail',
            'Avatar': '#profileAvatar',
            'Contenedor Propiedades': '#profilePropertiesList',
            'Lista Vecinos': '#profileNeighborsList',
            'Formulario Contacto': '#contactForm',
            'Selector País': '#phoneCountrySelect',
            'Input Teléfono': '#phoneNumberInput',
            'GDPR Contacto': '#contactGdpr',
            'Botón Cambiar Contraseña': '#changePasswordBtn',
            'Botón Eliminar Cuenta': '#deleteAccountBtn'
        };
        
        return this.checkDOMElements(elements);
    }

    // ============================================================
    // VERIFICACIONES DE DATOS
    // ============================================================

    async checkSupabaseConnection() {
        try {
            this.log('Verificando conexión a Supabase...');
            if (!this.supabase) {
                this.log('Cliente de Supabase no disponible', 'error');
                return false;
            }
            
            // Intentar obtener session
            const { data, error } = await this.supabase.auth.getSession();
            if (error) {
                this.log(`Error de conexión: ${error.message}`, 'error');
                return false;
            }
            
            if (data?.session) {
                this.log('Conexión a Supabase exitosa ✅', 'success');
                return true;
            } else {
                this.log('No hay sesión activa', 'warning');
                return false;
            }
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
            return false;
        }
    }

    async checkUserData() {
        try {
            this.log('Obteniendo datos del usuario...');
            const { data, error } = await this.supabase.auth.getUser();
            if (error) throw error;
            
            if (data?.user) {
                this.log(`Email: ${data.user.email}`, 'success');
                this.log(`User ID: ${data.user.id}`, 'info');
                return data.user;
            }
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    async checkPropietarioData() {
        try {
            this.log('Verificando datos del propietario...');
            const user = await this.checkUserData();
            if (!user) return null;

            const { data, error } = await this.supabase
                .from('propietarios')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error) {
                this.log(`Error: ${error.message}`, 'error');
                return null;
            }

            if (data) {
                this.log(`Propietario encontrado:`, 'success');
                this.log(`  Nombre: ${data.nombre}`);
                this.log(`  Email: ${data.email}`);
                this.log(`  Bloque ${data.bloque}, Portal ${data.portal}, ${data.planta}º ${data.letra}`);
                this.log(`  Teléfono: ${data.telefono || 'No registrado'}`);
                return data;
            } else {
                this.log('No hay datos de propietario registrados', 'warning');
                return null;
            }
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    async checkPropiedadesAdicionales() {
        try {
            this.log('Verificando propiedades adicionales...');
            const user = await this.checkUserData();
            if (!user) return [];

            const { data, error } = await this.supabase
                .from('propiedades_adicionales')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                this.log(`Error: ${error.message}`, 'error');
                return [];
            }

            if (data?.length > 0) {
                this.log(`${data.length} propiedad(es) adicional(es) encontrada(s):`, 'success');
                data.forEach((prop, i) => {
                    this.log(`  ${i + 1}. Bloque ${prop.bloque}, Portal ${prop.portal}, ${prop.planta}º ${prop.letra}`);
                });
                return data;
            } else {
                this.log('No hay propiedades adicionales', 'info');
                return [];
            }
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    // ============================================================
    // UTILIDADES DE FORM
    // ============================================================

    fillRegisterForm(nombre, email, password) {
        try {
            this.log('Rellenando formulario de registro...');
            document.getElementById('nombre').value = nombre;
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;
            document.getElementById('confirmPassword').value = password;
            document.getElementById('gdprAccept').checked = true;
            
            this.log('Formulario rellenado', 'success');
            return true;
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
            return false;
        }
    }

    fillPropertyForm(bloque, portal, planta, letra, tipo) {
        try {
            this.log('Rellenando formulario de vivienda...');
            document.getElementById('bloque').value = bloque;
            document.getElementById('portal').value = portal;
            document.getElementById('planta').value = planta;
            document.getElementById('letra').value = letra;
            document.getElementById('tipo').value = tipo;
            
            this.log('Formulario de vivienda rellenado', 'success');
            return true;
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
            return false;
        }
    }

    // ============================================================
    // SIMULACIONES DE ACCIONES
    // ============================================================

    clickElement(selector, description) {
        try {
            this.log(`Haciendo click en ${description}...`);
            const element = document.querySelector(selector);
            if (!element) {
                this.log(`Elemento no encontrado: ${selector}`, 'error');
                return false;
            }
            element.click();
            this.log(`Click realizado en ${description}`, 'success');
            return true;
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
            return false;
        }
    }

    // ============================================================
    // RESUMEN DE TESTING
    // ============================================================

    printTestingSummary() {
        console.clear();
        this.log('='.repeat(60));
        this.log('RESUMEN DE VALIDACIÓN');
        this.log('='.repeat(60));
        
        console.log(`
📋 GUÍA RÁPIDA DE TESTING
========================

1. REGISTRO:
   - test.testRegisterFormElements() - Verifica elementos del formulario
   - test.fillRegisterForm('Juan', 'juan@test.com', 'Pass123') - Rellena formulario

2. ONBOARDING:
   - test.testOnboardingPageElements() - Verifica elementos
   - test.fillPropertyForm('2', '1', '1', 'A', 'Dueno') - Rellena vivienda

3. DASHBOARD:
   - test.testDashboardElements() - Verifica elementos
   - test.checkDOMElements({...}) - Chequea elementos específicos

4. DATOS:
   - test.checkSupabaseConnection() - Verifica conexión
   - test.checkUserData() - Obtiene datos del usuario
   - test.checkPropietarioData() - Obtiene datos del propietario
   - test.checkPropiedadesAdicionales() - Obtiene propiedades adicionales

5. UTILIDADES:
   - test.checkCurrentPage() - Página actual
   - test.checkIfAuthenticated() - Estado de autenticación
   - test.log('mensaje', 'type') - Loguear mensajes

TIPOS DE LOGS: 'success', 'error', 'warning', 'info'
        `);
    }
}

// Inicializar globalmente
const test = new TestingHelper();
console.log('%c✅ Testing Helper Cargado', 'color: green; font-size: 16px; font-weight: bold');
console.log('Escribe test.printTestingSummary() para ver guía completa');

// Auto-ejecutar verificaciones al cargar
test.log('🚀 Testing Helper iniciado');
