// Sistema de Internacionalización (i18n) para L2H
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('l2h-language') || this.detectBrowserLanguage();
        this.translations = {
            es: {
                // Página principal (index.html)
                'app.name': 'L2H',
                'app.subtitle': 'Comunidad de Propietarios Lomas 2',
                'app.description': 'Portal de gestión para la comunidad de vecinos',
                'nav.login': 'Iniciar Sesión',
                'nav.register': 'Registrarse',
                'nav.logout': 'Cerrar Sesión',
                'nav.dashboard': 'Panel de Control',
                'nav.back': 'Volver',
                
                // Login
                'login.title': 'Iniciar Sesión',
                'login.subtitle': 'Accede a tu cuenta de L2H',
                'login.email': 'Correo Electrónico',
                'login.password': 'Contraseña',
                'login.button': 'Iniciar Sesión',
                'login.noAccount': '¿No tienes cuenta?',
                'login.registerLink': 'Regístrate aquí',
                'login.forgotPassword': '¿Olvidaste tu contraseña?',
                'login.error.required': 'Por favor completa todos los campos',
                'login.error.invalid': 'Credenciales inválidas',
                'login.success': 'Inicio de sesión exitoso',
                
                // Register
                'register.title': 'Registrarse',
                'register.subtitle': 'Crea tu cuenta en L2H',
                'register.name': 'Nombre Completo',
                'register.name.placeholder': 'Tu nombre y apellido',
                'register.name.help': 'Se utilizará para identificarte en el sistema',
                'register.email': 'Correo Electrónico',
                'register.email.placeholder': 'ejemplo@correo.com',
                'register.email.help': 'Será tu usuario para iniciar sesión en L2H',
                'register.password': 'Contraseña',
                'register.password.placeholder': 'Mínimo 8 caracteres',
                'register.password.help': 'Debe contener mayúsculas, minúsculas y números',
                'register.confirmPassword': 'Confirmar Contraseña',
                'register.confirmPassword.placeholder': 'Repite tu contraseña',
                'register.confirmPassword.help': 'Debe coincidir con la contraseña anterior',
                'register.propertyInfo': 'Datos de tu vivienda en L2H',
                'register.propertyInfo.help': 'Completa los siguientes campos con la ubicación de tu inmueble en Lomas 2',
                'register.block': 'Bloque',
                'register.block.placeholder': 'Selecciona el número de bloque',
                'register.block.help': 'Número del bloque de edificios (1-8)',
                'register.portal': 'Portal',
                'register.portal.placeholder': 'Selecciona el portal',
                'register.portal.help': 'Portal de entrada (1 ó 2)',
                'register.floor': 'Planta',
                'register.floor.placeholder': 'Selecciona la planta',
                'register.floor.help': 'Piso donde se encuentra tu vivienda',
                'register.floor.basement': 'Bajo',
                'register.floor.penthouse': 'Ático',
                'register.letter': 'Letra',
                'register.letter.placeholder': 'Selecciona la letra',
                'register.letter.help': 'Letra de identificación de la vivienda',
                'register.ownerType': 'Tipo de Propietario',
                'register.ownerType.placeholder': 'Selecciona tu rol',
                'register.ownerType.help': '¿Cuál es tu relación con la propiedad?',
                'register.ownerType.owner': 'Dueño',
                'register.ownerType.manager': 'Property Manager',
                'register.ownerType.tenant': 'Inquilino',
                'register.button': 'Registrarse',
                'register.hasAccount': '¿Ya tienes cuenta?',
                'register.loginLink': 'Inicia sesión aquí',
                'register.error.passwordMismatch': 'Las contraseñas no coinciden',
                'register.error.allRequired': 'Todos los campos son obligatorios',
                'register.error.emailInvalid': 'El correo electrónico no es válido',
                'register.error.passwordWeak': 'La contraseña debe tener al menos 8 caracteres',
                'register.success': 'Registro exitoso. Redirigiendo...',
                
                // Dashboard
                'dashboard.title': 'Panel de Control',
                'dashboard.welcome': 'Bienvenido a L2H',
                'dashboard.subtitle': 'Comunidad de Propietarios Lomas 2 - Portal de Gestión',
                
                // Formularios comunes
                'form.required': 'Campo obligatorio',
                'form.select': 'Selecciona una opción',
                
                // Mensajes
                'message.loading': 'Cargando...',
                'message.error': 'Ha ocurrido un error',
                'message.success': 'Operación exitosa',
                
                // Theme
                'theme.toggle': 'Cambiar tema',
                'theme.light': 'Tema claro',
                'theme.dark': 'Tema oscuro',
                
                // Language
                'language.select': 'Seleccionar idioma',
                'language.es': 'Español',
                'language.en': 'English',
                'language.fr': 'Français',
                'language.de': 'Deutsch'
            },
            en: {
                // Main page (index.html)
                'app.name': 'L2H',
                'app.subtitle': 'Lomas 2 Homeowners Association',
                'app.description': 'Management portal for the community',
                'nav.login': 'Log In',
                'nav.register': 'Sign Up',
                'nav.logout': 'Log Out',
                'nav.dashboard': 'Dashboard',
                'nav.back': 'Back',
                
                // Login
                'login.title': 'Log In',
                'login.subtitle': 'Access your L2H account',
                'login.email': 'Email Address',
                'login.password': 'Password',
                'login.button': 'Log In',
                'login.noAccount': "Don't have an account?",
                'login.registerLink': 'Sign up here',
                'login.forgotPassword': 'Forgot your password?',
                'login.error.required': 'Please fill in all fields',
                'login.error.invalid': 'Invalid credentials',
                'login.success': 'Login successful',
                
                // Register
                'register.title': 'Sign Up',
                'register.subtitle': 'Create your L2H account',
                'register.name': 'Full Name',
                'register.name.placeholder': 'Your first and last name',
                'register.name.help': 'Will be used to identify you in the system',
                'register.email': 'Email Address',
                'register.email.placeholder': 'example@email.com',
                'register.email.help': 'Will be your username to log in to L2H',
                'register.password': 'Password',
                'register.password.placeholder': 'Minimum 8 characters',
                'register.password.help': 'Must contain uppercase, lowercase and numbers',
                'register.confirmPassword': 'Confirm Password',
                'register.confirmPassword.placeholder': 'Repeat your password',
                'register.confirmPassword.help': 'Must match the password above',
                'register.propertyInfo': 'Your property details in L2H',
                'register.propertyInfo.help': 'Complete the following fields with your property location in Lomas 2',
                'register.block': 'Block',
                'register.block.placeholder': 'Select block number',
                'register.block.help': 'Building block number (1-8)',
                'register.portal': 'Entrance',
                'register.portal.placeholder': 'Select entrance',
                'register.portal.help': 'Entrance door (1 or 2)',
                'register.floor': 'Floor',
                'register.floor.placeholder': 'Select floor',
                'register.floor.help': 'Floor where your property is located',
                'register.floor.basement': 'Ground',
                'register.floor.penthouse': 'Penthouse',
                'register.letter': 'Unit',
                'register.letter.placeholder': 'Select unit letter',
                'register.letter.help': 'Unit identification letter',
                'register.ownerType': 'Owner Type',
                'register.ownerType.placeholder': 'Select your role',
                'register.ownerType.help': 'What is your relationship with the property?',
                'register.ownerType.owner': 'Owner',
                'register.ownerType.manager': 'Property Manager',
                'register.ownerType.tenant': 'Tenant',
                'register.button': 'Sign Up',
                'register.hasAccount': 'Already have an account?',
                'register.loginLink': 'Log in here',
                'register.error.passwordMismatch': 'Passwords do not match',
                'register.error.allRequired': 'All fields are required',
                'register.error.emailInvalid': 'Email address is not valid',
                'register.error.passwordWeak': 'Password must be at least 8 characters',
                'register.success': 'Registration successful. Redirecting...',
                
                // Dashboard
                'dashboard.title': 'Dashboard',
                'dashboard.welcome': 'Welcome to L2H',
                'dashboard.subtitle': 'Lomas 2 Homeowners Association - Management Portal',
                
                // Common forms
                'form.required': 'Required field',
                'form.select': 'Select an option',
                
                // Messages
                'message.loading': 'Loading...',
                'message.error': 'An error occurred',
                'message.success': 'Operation successful',
                
                // Theme
                'theme.toggle': 'Toggle theme',
                'theme.light': 'Light theme',
                'theme.dark': 'Dark theme',
                
                // Language
                'language.select': 'Select language',
                'language.es': 'Español',
                'language.en': 'English',
                'language.fr': 'Français',
                'language.de': 'Deutsch'
            },
            fr: {
                // Page principale (index.html)
                'app.name': 'L2H',
                'app.subtitle': 'Association des Propriétaires Lomas 2',
                'app.description': 'Portail de gestion pour la communauté',
                'nav.login': 'Se Connecter',
                'nav.register': "S'inscrire",
                'nav.logout': 'Se Déconnecter',
                'nav.dashboard': 'Tableau de Bord',
                'nav.back': 'Retour',
                
                // Connexion
                'login.title': 'Se Connecter',
                'login.subtitle': 'Accédez à votre compte L2H',
                'login.email': 'Adresse E-mail',
                'login.password': 'Mot de Passe',
                'login.button': 'Se Connecter',
                'login.noAccount': "Vous n'avez pas de compte?",
                'login.registerLink': 'Inscrivez-vous ici',
                'login.forgotPassword': 'Mot de passe oublié?',
                'login.error.required': 'Veuillez remplir tous les champs',
                'login.error.invalid': 'Identifiants invalides',
                'login.success': 'Connexion réussie',
                
                // Inscription
                'register.title': "S'inscrire",
                'register.subtitle': 'Créez votre compte L2H',
                'register.name': 'Nom Complet',
                'register.name.placeholder': 'Votre prénom et nom',
                'register.name.help': 'Sera utilisé pour vous identifier dans le système',
                'register.email': 'Adresse E-mail',
                'register.email.placeholder': 'exemple@email.com',
                'register.email.help': 'Sera votre nom d\'utilisateur pour vous connecter à L2H',
                'register.password': 'Mot de Passe',
                'register.password.placeholder': 'Minimum 8 caractères',
                'register.password.help': 'Doit contenir des majuscules, minuscules et chiffres',
                'register.confirmPassword': 'Confirmer le Mot de Passe',
                'register.confirmPassword.placeholder': 'Répétez votre mot de passe',
                'register.confirmPassword.help': 'Doit correspondre au mot de passe ci-dessus',
                'register.propertyInfo': 'Détails de votre propriété dans L2H',
                'register.propertyInfo.help': 'Complétez les champs suivants avec l\'emplacement de votre propriété à Lomas 2',
                'register.block': 'Bloc',
                'register.block.placeholder': 'Sélectionnez le numéro de bloc',
                'register.block.help': 'Numéro du bloc de bâtiments (1-8)',
                'register.portal': 'Entrée',
                'register.portal.placeholder': "Sélectionnez l'entrée",
                'register.portal.help': 'Porte d\'entrée (1 ou 2)',
                'register.floor': 'Étage',
                'register.floor.placeholder': "Sélectionnez l'étage",
                'register.floor.help': 'Étage où se trouve votre propriété',
                'register.floor.basement': 'Rez-de-chaussée',
                'register.floor.penthouse': 'Penthouse',
                'register.letter': 'Unité',
                'register.letter.placeholder': "Sélectionnez la lettre de l'unité",
                'register.letter.help': "Lettre d'identification de l'unité",
                'register.ownerType': 'Type de Propriétaire',
                'register.ownerType.placeholder': 'Sélectionnez votre rôle',
                'register.ownerType.help': 'Quelle est votre relation avec la propriété?',
                'register.ownerType.owner': 'Propriétaire',
                'register.ownerType.manager': 'Gestionnaire',
                'register.ownerType.tenant': 'Locataire',
                'register.button': "S'inscrire",
                'register.hasAccount': 'Vous avez déjà un compte?',
                'register.loginLink': 'Connectez-vous ici',
                'register.error.passwordMismatch': 'Les mots de passe ne correspondent pas',
                'register.error.allRequired': 'Tous les champs sont obligatoires',
                'register.error.emailInvalid': "L'adresse e-mail n'est pas valide",
                'register.error.passwordWeak': 'Le mot de passe doit contenir au moins 8 caractères',
                'register.success': 'Inscription réussie. Redirection...',
                
                // Tableau de bord
                'dashboard.title': 'Tableau de Bord',
                'dashboard.welcome': 'Bienvenue à L2H',
                'dashboard.subtitle': 'Association des Propriétaires Lomas 2 - Portail de Gestion',
                
                // Formulaires communs
                'form.required': 'Champ obligatoire',
                'form.select': 'Sélectionnez une option',
                
                // Messages
                'message.loading': 'Chargement...',
                'message.error': "Une erreur s'est produite",
                'message.success': 'Opération réussie',
                
                // Thème
                'theme.toggle': 'Changer de thème',
                'theme.light': 'Thème clair',
                'theme.dark': 'Thème sombre',
                
                // Langue
                'language.select': 'Sélectionner la langue',
                'language.es': 'Español',
                'language.en': 'English',
                'language.fr': 'Français',
                'language.de': 'Deutsch'
            },
            de: {
                // Hauptseite (index.html)
                'app.name': 'L2H',
                'app.subtitle': 'Lomas 2 Eigentümergemeinschaft',
                'app.description': 'Verwaltungsportal für die Gemeinschaft',
                'nav.login': 'Anmelden',
                'nav.register': 'Registrieren',
                'nav.logout': 'Abmelden',
                'nav.dashboard': 'Dashboard',
                'nav.back': 'Zurück',
                
                // Anmeldung
                'login.title': 'Anmelden',
                'login.subtitle': 'Zugang zu Ihrem L2H-Konto',
                'login.email': 'E-Mail-Adresse',
                'login.password': 'Passwort',
                'login.button': 'Anmelden',
                'login.noAccount': 'Haben Sie kein Konto?',
                'login.registerLink': 'Hier registrieren',
                'login.forgotPassword': 'Passwort vergessen?',
                'login.error.required': 'Bitte füllen Sie alle Felder aus',
                'login.error.invalid': 'Ungültige Anmeldedaten',
                'login.success': 'Anmeldung erfolgreich',
                
                // Registrierung
                'register.title': 'Registrieren',
                'register.subtitle': 'Erstellen Sie Ihr L2H-Konto',
                'register.name': 'Vollständiger Name',
                'register.name.placeholder': 'Ihr Vor- und Nachname',
                'register.name.help': 'Wird verwendet, um Sie im System zu identifizieren',
                'register.email': 'E-Mail-Adresse',
                'register.email.placeholder': 'beispiel@email.com',
                'register.email.help': 'Wird Ihr Benutzername für die Anmeldung bei L2H sein',
                'register.password': 'Passwort',
                'register.password.placeholder': 'Mindestens 8 Zeichen',
                'register.password.help': 'Muss Groß-, Kleinbuchstaben und Zahlen enthalten',
                'register.confirmPassword': 'Passwort Bestätigen',
                'register.confirmPassword.placeholder': 'Wiederholen Sie Ihr Passwort',
                'register.confirmPassword.help': 'Muss mit dem obigen Passwort übereinstimmen',
                'register.propertyInfo': 'Ihre Immobiliendetails in L2H',
                'register.propertyInfo.help': 'Füllen Sie die folgenden Felder mit dem Standort Ihrer Immobilie in Lomas 2 aus',
                'register.block': 'Block',
                'register.block.placeholder': 'Blocknummer auswählen',
                'register.block.help': 'Gebäudeblocknummer (1-8)',
                'register.portal': 'Eingang',
                'register.portal.placeholder': 'Eingang auswählen',
                'register.portal.help': 'Eingangstür (1 oder 2)',
                'register.floor': 'Etage',
                'register.floor.placeholder': 'Etage auswählen',
                'register.floor.help': 'Etage, in der sich Ihre Immobilie befindet',
                'register.floor.basement': 'Erdgeschoss',
                'register.floor.penthouse': 'Penthouse',
                'register.letter': 'Einheit',
                'register.letter.placeholder': 'Einheitsbuchstaben auswählen',
                'register.letter.help': 'Einheitsidentifikationsbuchstabe',
                'register.ownerType': 'Eigentümertyp',
                'register.ownerType.placeholder': 'Wählen Sie Ihre Rolle',
                'register.ownerType.help': 'Was ist Ihre Beziehung zur Immobilie?',
                'register.ownerType.owner': 'Eigentümer',
                'register.ownerType.manager': 'Immobilienverwalter',
                'register.ownerType.tenant': 'Mieter',
                'register.button': 'Registrieren',
                'register.hasAccount': 'Haben Sie bereits ein Konto?',
                'register.loginLink': 'Hier anmelden',
                'register.error.passwordMismatch': 'Passwörter stimmen nicht überein',
                'register.error.allRequired': 'Alle Felder sind erforderlich',
                'register.error.emailInvalid': 'E-Mail-Adresse ist ungültig',
                'register.error.passwordWeak': 'Passwort muss mindestens 8 Zeichen lang sein',
                'register.success': 'Registrierung erfolgreich. Weiterleitung...',
                
                // Dashboard
                'dashboard.title': 'Dashboard',
                'dashboard.welcome': 'Willkommen bei L2H',
                'dashboard.subtitle': 'Lomas 2 Eigentümergemeinschaft - Verwaltungsportal',
                
                // Allgemeine Formulare
                'form.required': 'Pflichtfeld',
                'form.select': 'Wählen Sie eine Option',
                
                // Nachrichten
                'message.loading': 'Lädt...',
                'message.error': 'Ein Fehler ist aufgetreten',
                'message.success': 'Operation erfolgreich',
                
                // Thema
                'theme.toggle': 'Thema wechseln',
                'theme.light': 'Helles Thema',
                'theme.dark': 'Dunkles Thema',
                
                // Sprache
                'language.select': 'Sprache auswählen',
                'language.es': 'Español',
                'language.en': 'English',
                'language.fr': 'Français',
                'language.de': 'Deutsch'
            }
        };
        
        this.init();
    }

    init() {
        // Aplicar traducciones cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.applyTranslations();
                this.createLanguageSelector();
            });
        } else {
            this.applyTranslations();
            this.createLanguageSelector();
        }
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0]; // 'es-ES' -> 'es'
        
        // Si el idioma detectado está disponible, usarlo; si no, usar español
        return this.translations[lang] ? lang : 'es';
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('l2h-language', lang);
            this.applyTranslations();
            this.updateLanguageSelector();
        }
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    applyTranslations() {
        // Traducir todos los elementos con atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.translate(key);
        });

        // Traducir placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
        });

        // Traducir atributos title (tooltips)
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
        });

        // Actualizar el atributo lang del HTML
        document.documentElement.lang = this.currentLanguage;
    }

    createLanguageSelector() {
        // Crear selector de idioma si no existe
        if (!document.getElementById('language-selector')) {
            const selector = document.createElement('div');
            selector.id = 'language-selector';
            selector.className = 'language-selector';
            
            const languages = [
                { code: 'es', flag: '🇪🇸', name: 'Español' },
                { code: 'en', flag: '🇬🇧', name: 'English' },
                { code: 'fr', flag: '🇫🇷', name: 'Français' },
                { code: 'de', flag: '🇩🇪', name: 'Deutsch' }
            ];

            const button = document.createElement('button');
            button.className = 'language-selector-button';
            button.setAttribute('aria-label', 'Seleccionar idioma');
            const currentLang = languages.find(l => l.code === this.currentLanguage);
            button.innerHTML = `${currentLang.flag} <span class="lang-code">${this.currentLanguage.toUpperCase()}</span>`;
            
            const dropdown = document.createElement('div');
            dropdown.className = 'language-dropdown';
            
            languages.forEach(lang => {
                const option = document.createElement('button');
                option.className = 'language-option';
                if (lang.code === this.currentLanguage) {
                    option.classList.add('active');
                }
                option.innerHTML = `${lang.flag} ${lang.name}`;
                option.addEventListener('click', () => {
                    this.setLanguage(lang.code);
                    dropdown.classList.remove('show');
                });
                dropdown.appendChild(option);
            });
            
            button.addEventListener('click', () => {
                dropdown.classList.toggle('show');
            });
            
            // Cerrar el dropdown al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!selector.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
            
            selector.appendChild(button);
            selector.appendChild(dropdown);
            document.body.appendChild(selector);
        }
    }

    updateLanguageSelector() {
        const button = document.querySelector('.language-selector-button');
        if (button) {
            const languages = [
                { code: 'es', flag: '🇪🇸' },
                { code: 'en', flag: '🇬🇧' },
                { code: 'fr', flag: '🇫🇷' },
                { code: 'de', flag: '🇩🇪' }
            ];
            const currentLang = languages.find(l => l.code === this.currentLanguage);
            button.innerHTML = `${currentLang.flag} <span class="lang-code">${this.currentLanguage.toUpperCase()}</span>`;
        }

        // Actualizar opciones activas
        const options = document.querySelectorAll('.language-option');
        options.forEach((option, index) => {
            const langCode = ['es', 'en', 'fr', 'de'][index];
            if (langCode === this.currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
}

// Variable global para acceder al gestor de traducciones
let i18n;

// Inicializar el sistema de traducciones cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n = new TranslationManager();
    });
} else {
    i18n = new TranslationManager();
}
