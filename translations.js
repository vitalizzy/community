// Sistema de Internacionalización (i18n) para L2H
class TranslationManager {
    constructor() {
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
                'register.gdpr.text': 'He leído y acepto la',
                'register.gdpr.privacy': 'Política de Privacidad',
                'register.gdpr.consent': 'y el tratamiento de mis datos personales conforme al Reglamento General de Protección de Datos (GDPR). Consiento el uso de mi información para la gestión de la comunidad L2H.',
                'register.gdpr.error': 'Debes aceptar la política de privacidad para continuar',
                
                // Dashboard
                'dashboard.title': 'Panel de Control',
                'dashboard.welcome': 'Bienvenido a L2H',
                'dashboard.subtitle': 'Comunidad de Propietarios Lomas 2 - Portal de Gestión',
                
                // Perfil
                'profile.menu.title': 'Tu cuenta',
                'profile.menu.subtitle': 'Gestiona tus datos y preferencias',
                'profile.menu.loading': 'Cargando perfil...',
                'profile.menu.error': 'No se pudieron cargar los datos de la cuenta',
                'profile.menu.reload': 'Reintentar',
                'profile.properties.title': 'Mis viviendas',
                'profile.properties.primaryLabel': 'Principal',
                'profile.properties.additionalLabel': 'Adicional',
                'profile.properties.none': 'Aún no has añadido viviendas adicionales.',
                'profile.properties.addButton': 'Agregar vivienda',
                'profile.properties.form.title': 'Agregar vivienda',
                'profile.properties.form.alias': 'Nombre interno (opcional)',
                'profile.properties.form.alias.placeholder': 'Ej. Apartamento playa',
                'profile.properties.form.submit': 'Guardar vivienda',
                'profile.properties.form.cancel': 'Cancelar',
                'profile.properties.added': 'Vivienda guardada correctamente',
                'profile.properties.addError': 'No se pudo guardar la vivienda. Revisa los datos.',
                'profile.neighbors.title': 'Vecinos registrados',
                'profile.neighbors.empty': 'Aún no hay otros usuarios registrados en estas viviendas.',
                'profile.neighbors.selfTag': 'Tú',
                'profile.neighbors.error': 'No se pudieron obtener los vecinos registrados.',
                'profile.contact.title': 'Información de contacto',
                'profile.contact.phone': 'Teléfono',
                'profile.contact.invalidPhone': 'Introduce un número de teléfono válido',
                'profile.contact.gdprLabel': 'Acepto la política de privacidad (GDPR)',
                'profile.contact.gdprRequired': 'Debes aceptar la política de privacidad (GDPR)',
                'profile.contact.save': 'Guardar cambios',
                'profile.contact.updated': 'Datos de contacto actualizados',
                'profile.contact.error': 'No se pudieron actualizar tus datos',
                'profile.preferences.title': 'Preferencias',
                'profile.preferences.theme': 'Tema',
                'profile.preferences.language': 'Idioma',
                'profile.actions.logout': 'Cerrar sesión',
                'profile.actions.delete': 'Solicitar eliminación',
                'profile.delete.confirmation': '¿Seguro que deseas solicitar la eliminación de tu cuenta? Recibirás un correo para confirmar.',
                'profile.delete.sent': 'Hemos enviado un correo para confirmar la eliminación de tu cuenta.',
                'profile.delete.error': 'No se pudo solicitar la eliminación. Inténtalo más tarde.',
                
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
                'language.de': 'Deutsch',
                
                // Password Recovery
                'password.recovery.title': 'Recuperar Contraseña',
                'password.recovery.subtitle': 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña',
                'password.recovery.send': 'Enviar enlace',
                'password.recovery.success': '¡Correo Enviado!',
                'password.recovery.checkEmail': 'Revisa tu bandeja de entrada y haz clic en el enlace para restablecer tu contraseña.',
                'password.recovery.expireTime': 'El enlace expira en 24 horas.',
                
                // Password Change
                'password.change.title': 'Cambiar Contraseña',
                'password.change.subtitle': 'Actualiza tu contraseña de forma segura',
                'password.change.newPassword': 'Nueva Contraseña',
                'password.change.button': 'Cambiar Contraseña',
                'password.req.length': 'Mínimo 8 caracteres',
                'password.req.uppercase': 'Una mayúscula',
                'password.req.lowercase': 'Una minúscula',
                'password.req.number': 'Un número',
                
                // Password Reset
                'password.reset.success': '¡Contraseña Restablecida!',
                'password.reset.message': 'Tu contraseña ha sido actualizada exitosamente. Serás redirigido a la página de inicio de sesión.',
                'password.error.mismatch': 'Las contraseñas no coinciden',
                'password.error.weak': 'La contraseña no cumple con los requisitos de seguridad',
                'password.error.same': 'La nueva contraseña debe ser diferente a la contraseña actual',
                'password.recovery.invalidToken': 'El enlace de recuperación es inválido o ha expirado. Por favor solicita uno nuevo.',
                'password.strength.weak': 'Fortaleza de Contraseña: Débil',
                'password.strength.medium': 'Fortaleza de Contraseña: Media',
                'password.strength.strong': 'Fortaleza de Contraseña: Fuerte'
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
                'register.gdpr.text': 'I have read and accept the',
                'register.gdpr.privacy': 'Privacy Policy',
                'register.gdpr.consent': 'and the processing of my personal data in accordance with the General Data Protection Regulation (GDPR). I consent to the use of my information for the management of the L2H community.',
                'register.gdpr.error': 'You must accept the privacy policy to continue',
                
                // Dashboard
                'dashboard.title': 'Dashboard',
                'dashboard.welcome': 'Welcome to L2H',
                'dashboard.subtitle': 'Lomas 2 Homeowners Association - Management Portal',
                
                // Profile
                'profile.menu.title': 'Your account',
                'profile.menu.subtitle': 'Manage your data and preferences',
                'profile.menu.loading': 'Loading profile...',
                'profile.menu.error': 'We couldn’t load your account data',
                'profile.menu.reload': 'Try again',
                'profile.properties.title': 'My properties',
                'profile.properties.primaryLabel': 'Primary',
                'profile.properties.additionalLabel': 'Additional',
                'profile.properties.none': 'You haven’t added additional properties yet.',
                'profile.properties.addButton': 'Add property',
                'profile.properties.form.title': 'Add property',
                'profile.properties.form.alias': 'Internal name (optional)',
                'profile.properties.form.alias.placeholder': 'e.g. Beach apartment',
                'profile.properties.form.submit': 'Save property',
                'profile.properties.form.cancel': 'Cancel',
                'profile.properties.added': 'Property saved successfully',
                'profile.properties.addError': 'We couldn’t save the property. Please review the data.',
                'profile.neighbors.title': 'Registered neighbors',
                'profile.neighbors.empty': 'No other users are registered for these properties yet.',
                'profile.neighbors.selfTag': 'You',
                'profile.neighbors.error': 'We couldn’t fetch the registered neighbors.',
                'profile.contact.title': 'Contact information',
                'profile.contact.phone': 'Phone',
                'profile.contact.invalidPhone': 'Enter a valid phone number',
                'profile.contact.gdprLabel': 'I accept the privacy policy (GDPR)',
                'profile.contact.gdprRequired': 'You must accept the privacy policy (GDPR)',
                'profile.contact.save': 'Save changes',
                'profile.contact.updated': 'Contact details updated',
                'profile.contact.error': 'We couldn\'t update your details',
                'profile.preferences.title': 'Preferences',
                'profile.preferences.theme': 'Theme',
                'profile.preferences.language': 'Language',
                'profile.actions.logout': 'Log out',
                'profile.actions.delete': 'Request deletion',
                'profile.delete.confirmation': 'Are you sure you want to request the deletion of your account? You will receive a confirmation email.',
                'profile.delete.sent': 'We have sent an email to confirm your account deletion.',
                'profile.delete.error': 'We couldn’t request the deletion. Please try again later.',
                
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
                'language.de': 'Deutsch',
                
                // Password Recovery
                'password.recovery.title': 'Reset Password',
                'password.recovery.subtitle': 'Enter your email address and we will send you a link to reset your password',
                'password.recovery.send': 'Send link',
                'password.recovery.success': 'Email Sent!',
                'password.recovery.checkEmail': 'Check your inbox and click the link to reset your password.',
                'password.recovery.expireTime': 'The link expires in 24 hours.',
                
                // Password Change
                'password.change.title': 'Change Password',
                'password.change.subtitle': 'Update your password securely',
                'password.change.newPassword': 'New Password',
                'password.change.button': 'Change Password',
                'password.req.length': 'Minimum 8 characters',
                'password.req.uppercase': 'One uppercase letter',
                'password.req.lowercase': 'One lowercase letter',
                'password.req.number': 'One number',
                
                // Password Reset
                'password.reset.success': 'Password Reset Successful!',
                'password.reset.message': 'Your password has been successfully updated. You will be redirected to the login page.',
                'password.error.mismatch': 'Passwords do not match',
                'password.error.weak': 'Password does not meet security requirements',
                'password.error.same': 'New password must be different from current password',
                'password.recovery.invalidToken': 'The recovery link is invalid or has expired. Please request a new one.',
                'password.strength.weak': 'Password Strength: Weak',
                'password.strength.medium': 'Password Strength: Medium',
                'password.strength.strong': 'Password Strength: Strong'
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
                'register.gdpr.text': "J'ai lu et j'accepte la",
                'register.gdpr.privacy': 'Politique de Confidentialité',
                'register.gdpr.consent': 'et le traitement de mes données personnelles conformément au Règlement Général sur la Protection des Données (RGPD). Je consens à l\'utilisation de mes informations pour la gestion de la communauté L2H.',
                'register.gdpr.error': 'Vous devez accepter la politique de confidentialité pour continuer',
                
                // Tableau de bord
                'dashboard.title': 'Tableau de Bord',
                'dashboard.welcome': 'Bienvenue à L2H',
                'dashboard.subtitle': 'Association des Propriétaires Lomas 2 - Portail de Gestion',
                
                // Profil
                'profile.menu.title': 'Votre compte',
                'profile.menu.subtitle': 'Gérez vos données et préférences',
                'profile.menu.loading': 'Chargement du profil...',
                'profile.menu.error': 'Impossible de charger les données de votre compte',
                'profile.menu.reload': 'Réessayer',
                'profile.properties.title': 'Mes logements',
                'profile.properties.primaryLabel': 'Principal',
                'profile.properties.additionalLabel': 'Supplémentaire',
                'profile.properties.none': 'Vous n’avez pas encore ajouté d’autres logements.',
                'profile.properties.addButton': 'Ajouter un logement',
                'profile.properties.form.title': 'Ajouter un logement',
                'profile.properties.form.alias': 'Nom interne (optionnel)',
                'profile.properties.form.alias.placeholder': 'ex. Appartement plage',
                'profile.properties.form.submit': 'Enregistrer le logement',
                'profile.properties.form.cancel': 'Annuler',
                'profile.properties.added': 'Logement enregistré avec succès',
                'profile.properties.addError': 'Impossible d’enregistrer le logement. Vérifiez les données.',
                'profile.neighbors.title': 'Voisins enregistrés',
                'profile.neighbors.empty': 'Aucun autre utilisateur n’est encore enregistré sur ces logements.',
                'profile.neighbors.selfTag': 'Vous',
                'profile.neighbors.error': 'Impossible de récupérer les voisins enregistrés.',
                'profile.contact.title': 'Informations de contact',
                'profile.contact.phone': 'Téléphone',
                'profile.contact.invalidPhone': 'Entrez un numéro de téléphone valide',
                'profile.contact.gdprLabel': 'J\'accepte la politique de confidentialité (RGPD)',
                'profile.contact.gdprRequired': 'Vous devez accepter la politique de confidentialité (RGPD)',
                'profile.contact.save': 'Enregistrer les modifications',
                'profile.contact.updated': 'Coordonnées mises à jour',
                'profile.contact.error': 'Impossible de mettre à jour vos données',
                'profile.preferences.title': 'Préférences',
                'profile.preferences.theme': 'Thème',
                'profile.preferences.language': 'Langue',
                'profile.actions.logout': 'Se déconnecter',
                'profile.actions.delete': 'Demander la suppression',
                'profile.delete.confirmation': 'Voulez-vous vraiment demander la suppression de votre compte ? Vous recevrez un e-mail de confirmation.',
                'profile.delete.sent': 'Nous avons envoyé un e-mail pour confirmer la suppression de votre compte.',
                'profile.delete.error': 'La demande de suppression a échoué. Réessayez plus tard.',
                
                // Formulaires communs
                'form.required': 'Champ obligatoire',
                'form.select': 'Sélectionnez une option',
                
                // Messages
                'message.loading': 'Chargement...',
                'message.error': "Une erreur s'est produite",
                'message.success': 'Opération réussie',
                
                // Thème
                'theme.toggle': 'Basculer le thème',
                'theme.light': 'Thème clair',
                'theme.dark': 'Thème sombre',
                
                // Langue
                'language.select': 'Sélectionner la langue',
                'language.es': 'Español',
                'language.en': 'English',
                'language.fr': 'Français',
                'language.de': 'Deutsch',
                
                // Récupération de mot de passe
                'password.recovery.title': 'Réinitialiser le mot de passe',
                'password.recovery.subtitle': 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe',
                'password.recovery.send': 'Envoyer le lien',
                'password.recovery.success': 'Email envoyé!',
                'password.recovery.checkEmail': 'Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.',
                'password.recovery.expireTime': 'Le lien expire dans 24 heures.',
                
                // Changement de mot de passe
                'password.change.title': 'Changer le mot de passe',
                'password.change.subtitle': 'Mettez à jour votre mot de passe en toute sécurité',
                'password.change.newPassword': 'Nouveau mot de passe',
                'password.change.button': 'Changer le mot de passe',
                'password.req.length': 'Minimum 8 caractères',
                'password.req.uppercase': 'Une lettre majuscule',
                'password.req.lowercase': 'Une lettre minuscule',
                'password.req.number': 'Un chiffre',
                
                // Réinitialisation du mot de passe
                'password.reset.success': 'Réinitialisation du mot de passe réussie!',
                'password.reset.message': 'Votre mot de passe a été mis à jour avec succès. Vous serez redirigé vers la page de connexion.',
                'password.error.mismatch': 'Les mots de passe ne correspondent pas',
                'password.error.weak': 'Le mot de passe ne respecte pas les exigences de sécurité',
                'password.error.same': 'Le nouveau mot de passe doit être différent du mot de passe actuel',
                'password.recovery.invalidToken': 'Le lien de récupération est invalide ou a expiré. Veuillez en demander un nouveau.',
                'password.strength.weak': 'Force du mot de passe: Faible',
                'password.strength.medium': 'Force du mot de passe: Moyen',
                'password.strength.strong': 'Force du mot de passe: Fort'
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
                'register.gdpr.text': 'Ich habe die',
                'register.gdpr.privacy': 'Datenschutzrichtlinie',
                'register.gdpr.consent': 'gelesen und akzeptiert sowie die Verarbeitung meiner personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO). Ich stimme der Nutzung meiner Informationen für die Verwaltung der L2H-Gemeinschaft zu.',
                'register.gdpr.error': 'Sie müssen die Datenschutzrichtlinie akzeptieren, um fortzufahren',
                
                // Dashboard
                'dashboard.title': 'Dashboard',
                'dashboard.welcome': 'Willkommen bei L2H',
                'dashboard.subtitle': 'Lomas 2 Eigentümergemeinschaft - Verwaltungsportal',
                
                // Profil
                'profile.menu.title': 'Ihr Konto',
                'profile.menu.subtitle': 'Verwalten Sie Ihre Daten und Einstellungen',
                'profile.menu.loading': 'Profil wird geladen...',
                'profile.menu.error': 'Kontodaten konnten nicht geladen werden',
                'profile.menu.reload': 'Erneut versuchen',
                'profile.properties.title': 'Meine Wohnungen',
                'profile.properties.primaryLabel': 'Haupt',
                'profile.properties.additionalLabel': 'Zusätzlich',
                'profile.properties.none': 'Sie haben noch keine weiteren Wohnungen hinzugefügt.',
                'profile.properties.addButton': 'Wohnung hinzufügen',
                'profile.properties.form.title': 'Wohnung hinzufügen',
                'profile.properties.form.alias': 'Interner Name (optional)',
                'profile.properties.form.alias.placeholder': 'z. B. Ferienwohnung',
                'profile.properties.form.submit': 'Wohnung speichern',
                'profile.properties.form.cancel': 'Abbrechen',
                'profile.properties.added': 'Wohnung erfolgreich gespeichert',
                'profile.properties.addError': 'Wohnung konnte nicht gespeichert werden. Bitte prüfen Sie die Angaben.',
                'profile.neighbors.title': 'Registrierte Nachbarn',
                'profile.neighbors.empty': 'Für diese Wohnungen sind noch keine weiteren Nutzer registriert.',
                'profile.neighbors.selfTag': 'Sie',
                'profile.neighbors.error': 'Registrierte Nachbarn konnten nicht abgerufen werden.',
                'profile.contact.title': 'Kontaktinformationen',
                'profile.contact.phone': 'Telefon',
                'profile.contact.invalidPhone': 'Bitte eine gültige Telefonnummer eingeben',
                'profile.contact.gdprLabel': 'Ich akzeptiere die Datenschutzrichtlinie (DSGVO)',
                'profile.contact.gdprRequired': 'Sie müssen die Datenschutzrichtlinie (DSGVO) akzeptieren',
                'profile.contact.save': 'Änderungen speichern',
                'profile.contact.updated': 'Kontaktdaten aktualisiert',
                'profile.contact.error': 'Ihre Daten konnten nicht aktualisiert werden',
                'profile.preferences.title': 'Einstellungen',
                'profile.preferences.theme': 'Thema',
                'profile.preferences.language': 'Sprache',
                'profile.actions.logout': 'Abmelden',
                'profile.actions.delete': 'Löschung anfordern',
                'profile.delete.confirmation': 'Möchten Sie wirklich die Löschung Ihres Kontos anfordern? Sie erhalten eine Bestätigungs-E-Mail.',
                'profile.delete.sent': 'Wir haben eine E-Mail zur Bestätigung der Kontolöschung gesendet.',
                'profile.delete.error': 'Die Löschanfrage konnte nicht gestellt werden. Bitte versuchen Sie es später erneut.',
                
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
                'language.de': 'Deutsch',
                
                // Passwort-Wiederherstellung
                'password.recovery.title': 'Passwort zurücksetzen',
                'password.recovery.subtitle': 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts',
                'password.recovery.send': 'Link senden',
                'password.recovery.success': 'E-Mail versendet!',
                'password.recovery.checkEmail': 'Überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihr Passwort zurückzusetzen.',
                'password.recovery.expireTime': 'Der Link läuft in 24 Stunden ab.',
                
                // Passwort ändern
                'password.change.title': 'Passwort ändern',
                'password.change.subtitle': 'Aktualisieren Sie Ihr Passwort sicher',
                'password.change.newPassword': 'Neues Passwort',
                'password.change.button': 'Passwort ändern',
                'password.req.length': 'Mindestens 8 Zeichen',
                'password.req.uppercase': 'Ein Großbuchstabe',
                'password.req.lowercase': 'Ein Kleinbuchstabe',
                'password.req.number': 'Eine Ziffer',
                
                // Passwort-Rücksetzung
                'password.reset.success': 'Passwort-Rücksetzung erfolgreich!',
                'password.reset.message': 'Ihr Passwort wurde erfolgreich aktualisiert. Sie werden zur Anmeldeseite weitergeleitet.',
                'password.error.mismatch': 'Passwörter stimmen nicht überein',
                'password.error.weak': 'Passwort erfüllt nicht die Sicherheitsanforderungen',
                'password.error.same': 'Das neue Passwort muss sich vom aktuellen Passwort unterscheiden',
                'password.recovery.invalidToken': 'Der Wiederherstellungslink ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen an.',
                'password.strength.weak': 'Passwort-Sicherheit: Schwach',
                'password.strength.medium': 'Passwort-Sicherheit: Mittel',
                'password.strength.strong': 'Passwort-Sicherheit: Stark'
            }
        };
        
        // Inicializar el idioma actual DESPUÉS de definir translations
        this.currentLanguage = localStorage.getItem('l2h-language') || this.detectBrowserLanguage();
        
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
