(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const trigger = document.getElementById('profileMenuTrigger');
        const drawer = document.getElementById('profileDrawer');

        const supabaseClient = window.supabaseClient ?? (typeof supabase !== 'undefined' ? supabase : null);

        if (!trigger || !drawer) {
            return;
        }

        if (!supabaseClient) {
            console.error('Profile menu: Supabase client is not available.');
            return;
        }

        const menu = new ProfileMenu({
            supabase: supabaseClient,
            trigger,
            drawer
        });

        menu.init().catch(error => {
            console.error('Profile menu initialization failed:', error);
        });
    });
})();

class ProfileMenu {
    constructor({ supabase, trigger, drawer }) {
        this.supabase = supabase;
        this.trigger = trigger;
        this.drawer = drawer;
        this.backdrop = document.getElementById('profileBackdrop');
        this.closeButton = document.getElementById('profileDrawerClose');
        this.messageBox = document.getElementById('profileMenuMessage');
        this.propertiesList = document.getElementById('profilePropertiesList');
        this.toggleAddPropertyButton = document.getElementById('toggleAddProperty');
        this.addPropertyForm = document.getElementById('addPropertyForm');
        this.cancelPropertyButton = document.getElementById('cancelPropertyBtn');
        this.savePropertyButton = document.getElementById('savePropertyBtn');
        this.neighborsList = document.getElementById('profileNeighborsList');
        this.refreshNeighborsButton = document.getElementById('refreshNeighborsBtn');
        this.contactForm = document.getElementById('contactForm');
        this.contactPhoneInput = document.getElementById('contactPhone');
        this.contactGdprCheckbox = document.getElementById('contactGdpr');
        this.contactSubmitButton = this.contactForm?.querySelector('button[type="submit"]');
        this.themeToggleButton = document.getElementById('profileThemeToggle');
        this.languageToggleButton = document.getElementById('profileLanguageToggle');
        this.deleteAccountButton = document.getElementById('deleteAccountBtn');
        this.logoutButtons = Array.from(document.querySelectorAll('.logout-btn'));
        this.avatarSmall = document.getElementById('profileAvatar');
        this.avatarLarge = document.getElementById('profileAvatarLarge');
        this.profileNameSmall = document.getElementById('profileName');
        this.profileNameLarge = document.getElementById('profileDrawerName');
        this.profileEmailSmall = document.getElementById('profileTriggerEmail');
        this.profileEmailLarge = document.getElementById('profileDrawerEmail');

        this.state = {
            user: null,
            propietario: null,
            additionalProperties: [],
            neighbors: []
        };

        this.features = {
            additionalProperties: true,
            neighborsRpc: true
        };

        this.messageTimeout = null;
        this.handleKeydown = this.handleKeydown.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    async init() {
        this.bindEvents();
        await this.refreshData();
    }

    bindEvents() {
        this.trigger.addEventListener('click', () => {
            const isOpen = this.drawer.classList.contains('open');
            this.toggleDrawer(!isOpen);
        });

        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.toggleDrawer(false));
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.toggleDrawer(false));
        }

        if (this.toggleAddPropertyButton && this.addPropertyForm) {
            this.toggleAddPropertyButton.addEventListener('click', () => {
                this.clearMessage();
                const isHidden = this.addPropertyForm.hasAttribute('hidden');
                if (isHidden) {
                    this.addPropertyForm.removeAttribute('hidden');
                    const firstSelect = this.addPropertyForm.querySelector('select');
                    if (firstSelect) {
                        firstSelect.focus();
                    }
                } else {
                    this.addPropertyForm.setAttribute('hidden', '');
                }
            });
        }

        if (this.cancelPropertyButton) {
            this.cancelPropertyButton.addEventListener('click', () => {
                this.resetPropertyForm();
                this.addPropertyForm?.setAttribute('hidden', '');
            });
        }

        if (this.addPropertyForm) {
            this.addPropertyForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                await this.handleAddProperty();
            });
        }

        if (this.refreshNeighborsButton) {
            this.refreshNeighborsButton.addEventListener('click', async () => {
                await this.refreshNeighbors();
            });
        }

        if (this.contactForm) {
            this.contactForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                await this.handleContactSubmit();
            });
        }

        if (this.contactGdprCheckbox) {
            this.contactGdprCheckbox.addEventListener('change', () => {
                this.updateContactSubmitButtonState();
            });
        }

        if (this.themeToggleButton) {
            this.themeToggleButton.addEventListener('click', () => {
                if (window.themeManager && typeof window.themeManager.toggleTheme === 'function') {
                    window.themeManager.toggleTheme();
                } else {
                    this.toggleThemeFallback();
                }
            });
        }

        if (this.languageToggleButton) {
            this.languageToggleButton.addEventListener('click', () => {
                // Usar el mismo selector de idioma global
                if (window.i18n && typeof window.i18n.createLanguageSelector === 'function') {
                    // Si existe el selector global, simplemente hacer clic en el botón del selector
                    const selectorButton = document.querySelector('.language-selector-button');
                    if (selectorButton) {
                        selectorButton.click();
                        this.ensureDrawerRemainsOpen();
                    }
                }
            });
        }

        if (this.deleteAccountButton) {
            this.deleteAccountButton.addEventListener('click', async () => {
                await this.handleAccountDeletion();
            });
        }

        if (this.logoutButtons.length) {
            this.logoutButtons.forEach(button => {
                button.addEventListener('click', async (event) => {
                    event.preventDefault();
                    if (typeof window.logout === 'function') {
                        await window.logout();
                    }
                });
            });
        }
    }

    async refreshData(showErrors = true) {
        this.showMessage('info', this.t('profile.menu.loading', 'Cargando perfil...'));

        try {
            const { data, error } = await this.supabase.auth.getUser();
            if (error) {
                throw error;
            }

            const user = data?.user;
            if (!user) {
                throw new Error('Usuario no autenticado');
            }

            this.state.user = user;

            const propietario = await this.resolvePropietario(user.id);
            if (propietario) {
                this.state.propietario = propietario;
                this.populateHeader(user, propietario);
                this.prefillContactForm(propietario);
            }

            await this.loadAdditionalProperties(user.id);
            this.renderProperties();

            await this.refreshNeighbors(false);

            this.clearMessage();
        } catch (error) {
            console.error('Profile menu refresh error:', error);
            if (showErrors) {
                this.showMessage('error', this.t('profile.menu.error', 'No se pudieron cargar los datos de la cuenta'));
            }
        }
    }

    async resolvePropietario(userId) {
        try {
            if (typeof window.getCachedPropietarioData === 'function') {
                const cached = await window.getCachedPropietarioData();
                if (cached) {
                    return cached;
                }
            }

            const { data, error } = await this.supabase
                .from('propietarios')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();

            if (error) {
                throw error;
            }

            return data || null;
        } catch (error) {
            console.error('Profile menu propietario error:', error);
            return null;
        }
    }

    async loadAdditionalProperties(userId) {
        if (!this.features.additionalProperties) {
            this.state.additionalProperties = [];
            return;
        }

        try {
            const { data, error } = await this.supabase
                .from('propiedades_adicionales')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: true });

            if (error) {
                if (error.code === '42P01') {
                    this.features.additionalProperties = false;
                    this.toggleAddPropertyButton?.setAttribute('disabled', 'true');
                    return;
                }
                throw error;
            }

            this.state.additionalProperties = data || [];
        } catch (error) {
            console.error('Profile menu additional properties error:', error);
            this.state.additionalProperties = [];
            this.showMessage('error', this.t('profile.properties.addError', 'No se pudo guardar la vivienda. Revisa los datos.'));
        }
    }

    buildPropertyCollection() {
        const properties = [];

        if (this.state.propietario) {
            properties.push({
                type: 'primary',
                bloque: this.state.propietario.bloque,
                portal: this.state.propietario.portal,
                planta: this.state.propietario.planta,
                letra: this.state.propietario.letra,
                alias: null,
                created_at: this.state.propietario.created_at
            });
        }

        if (this.state.additionalProperties?.length) {
            this.state.additionalProperties.forEach(item => {
                properties.push({
                    ...item,
                    type: 'additional'
                });
            });
        }

        return properties;
    }

    renderProperties() {
        if (!this.propertiesList) {
            return;
        }

        const properties = this.buildPropertyCollection();
        this.propertiesList.innerHTML = '';

        if (!properties.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = this.t('profile.properties.none', 'Aún no has añadido viviendas adicionales.');
            this.propertiesList.appendChild(empty);
            return;
        }

        properties.forEach(property => {
            const card = document.createElement('div');
            card.className = 'property-card';

            const title = document.createElement('div');
            title.className = 'property-card-title';
            title.textContent = this.formatPropertyLabel(property);

            const meta = document.createElement('div');
            meta.className = 'property-meta';
            meta.textContent = this.formatPropertyMeta(property);

            const tags = document.createElement('div');
            tags.className = 'property-tags';

            const typeTag = document.createElement('span');
            typeTag.className = 'tag';
            typeTag.textContent = property.type === 'primary'
                ? this.t('profile.properties.primaryLabel', 'Principal')
                : this.t('profile.properties.additionalLabel', 'Adicional');
            tags.appendChild(typeTag);

            if (property.alias) {
                const aliasTag = document.createElement('span');
                aliasTag.className = 'tag';
                aliasTag.textContent = property.alias;
                tags.appendChild(aliasTag);
            }

            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(tags);
            this.propertiesList.appendChild(card);
        });
    }

    formatPropertyLabel(property) {
        return `Bloque ${property.bloque} · Portal ${property.portal} · ${property.planta}º ${property.letra}`;
    }

    formatPropertyMeta(property) {
        if (!property.created_at) {
            return '';
        }
        try {
            const date = new Date(property.created_at);
            return date.toLocaleDateString();
        } catch (error) {
            return '';
        }
    }

    async handleAddProperty() {
        if (!this.addPropertyForm || !this.state.user) {
            return;
        }

        const block = this.addPropertyForm.querySelector('#propertyBlock')?.value;
        const portal = this.addPropertyForm.querySelector('#propertyPortal')?.value;
        const floor = this.addPropertyForm.querySelector('#propertyFloor')?.value;
        const letter = this.addPropertyForm.querySelector('#propertyLetter')?.value;
        const aliasInput = this.addPropertyForm.querySelector('#propertyAlias');
        const alias = aliasInput?.value.trim() || null;

        if (!block || !portal || !floor || !letter) {
            this.showMessage('error', this.t('form.required', 'Campo obligatorio'));
            return;
        }

        this.savePropertyButton?.setAttribute('disabled', 'true');
        this.showMessage('info', this.t('profile.menu.loading', 'Cargando perfil...'));

        try {
            const { error } = await this.supabase
                .from('propiedades_adicionales')
                .insert([{
                    user_id: this.state.user.id,
                    bloque: block,
                    portal: portal,
                    planta: floor,
                    letra: letter,
                    alias: alias
                }]);

            if (error) {
                throw error;
            }

            this.resetPropertyForm();
            this.addPropertyForm.setAttribute('hidden', '');
            this.showMessage('success', this.t('profile.properties.added', 'Vivienda guardada correctamente'));
            await this.loadAdditionalProperties(this.state.user.id);
            this.renderProperties();
            await this.refreshNeighbors(false);
        } catch (error) {
            console.error('Add property error:', error);
            this.showMessage('error', this.t('profile.properties.addError', 'No se pudo guardar la vivienda. Revisa los datos.'));
        } finally {
            this.savePropertyButton?.removeAttribute('disabled');
        }
    }

    resetPropertyForm() {
        if (!this.addPropertyForm) {
            return;
        }

        this.addPropertyForm.reset();
    }

    async refreshNeighbors(showErrors = true) {
        if (!this.state.user || !this.features.neighborsRpc) {
            return;
        }

        try {
            const { data, error } = await this.supabase.rpc('get_neighbors_for_user_properties', {
                p_user_id: this.state.user.id
            });

            if (error) {
                if (error.code === '42883') {
                    this.features.neighborsRpc = false;
                    this.neighborsList.innerHTML = '';
                    return;
                }
                throw error;
            }

            this.state.neighbors = Array.isArray(data) ? data : [];
            this.renderNeighbors();
        } catch (error) {
            console.error('Neighbors fetch error:', error);
            this.state.neighbors = [];
            if (showErrors) {
                this.showMessage('error', this.t('profile.neighbors.error', 'No se pudieron obtener los vecinos registrados.'));
            }
        }
    }

    renderNeighbors() {
        if (!this.neighborsList) {
            return;
        }

        this.neighborsList.innerHTML = '';

        if (!this.state.neighbors.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = this.t('profile.neighbors.empty', 'Aún no hay otros usuarios registrados en estas viviendas.');
            this.neighborsList.appendChild(empty);
            return;
        }

        const grouped = this.state.neighbors.reduce((acc, item) => {
            if (!acc[item.propiedad]) {
                acc[item.propiedad] = [];
            }
            acc[item.propiedad].push(item);
            return acc;
        }, {});

        Object.entries(grouped).forEach(([propertyLabel, entries]) => {
            const others = entries.filter(entry => !entry.es_usuario_actual);
            if (!others.length) {
                return;
            }

            const card = document.createElement('div');
            card.className = 'neighbor-card';

            const propTitle = document.createElement('div');
            propTitle.className = 'neighbor-property';
            propTitle.textContent = propertyLabel;
            card.appendChild(propTitle);

            others.forEach(entry => {
                const name = document.createElement('h4');
                name.textContent = `${entry.nombre}`;

                const details = document.createElement('p');
                const ownerTypeLabel = this.translateOwnerType(entry.tipo_propietario);
                details.textContent = `${entry.email} · ${ownerTypeLabel}`;

                card.appendChild(name);
                card.appendChild(details);
            });

            this.neighborsList.appendChild(card);
        });

        if (!this.neighborsList.hasChildNodes()) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = this.t('profile.neighbors.empty', 'Aún no hay otros usuarios registrados en estas viviendas.');
            this.neighborsList.appendChild(empty);
        }
    }

    translateOwnerType(value) {
        const map = {
            'Dueno': this.t('register.ownerType.owner', 'Dueño'),
            'PropertyManager': this.t('register.ownerType.manager', 'Property Manager'),
            'Inquilino': this.t('register.ownerType.tenant', 'Inquilino')
        };
        return map[value] || value;
    }

    prefillContactForm(propietario) {
        if (!this.contactForm || !propietario) {
            return;
        }

        if (this.contactPhoneInput) {
            this.contactPhoneInput.value = propietario.telefono || '';
        }

        if (this.contactGdprCheckbox) {
            this.contactGdprCheckbox.checked = Boolean(propietario.gdpr_consent);
        }

        // Update button state after loading data
        this.updateContactSubmitButtonState();
    }

    updateContactSubmitButtonState() {
        if (!this.contactSubmitButton || !this.contactGdprCheckbox) {
            return;
        }

        // Only enable the button if GDPR checkbox is checked
        if (this.contactGdprCheckbox.checked) {
            this.contactSubmitButton.removeAttribute('disabled');
        } else {
            this.contactSubmitButton.setAttribute('disabled', 'true');
        }
    }

    async handleContactSubmit() {
        if (!this.state.user || !this.state.propietario) {
            return;
        }

        // Validate that GDPR checkbox is checked
        const consent = Boolean(this.contactGdprCheckbox?.checked);
        if (!consent) {
            this.showMessage('error', this.t('profile.contact.gdprRequired', 'Debes aceptar la política de privacidad (GDPR)'));
            return;
        }

        const phoneRaw = this.contactPhoneInput?.value.trim() || '';
        const sanitizedPhone = phoneRaw ? this.sanitizePhone(phoneRaw) : null;

        if (sanitizedPhone === false) {
            this.showMessage('error', this.t('profile.contact.invalidPhone', 'Introduce un número de teléfono válido'));
            return;
        }

        this.showMessage('info', this.t('profile.menu.loading', 'Cargando perfil...'));

        try {
            const updatePayload = {
                telefono: sanitizedPhone,
                gdpr_consent: consent,
                gdpr_consent_at: consent ? new Date().toISOString() : null
            };

            const { error } = await this.supabase
                .from('propietarios')
                .update(updatePayload)
                .eq('user_id', this.state.user.id);

            if (error) {
                throw error;
            }

            this.state.propietario = {
                ...this.state.propietario,
                ...updatePayload
            };

            this.showMessage('success', this.t('profile.contact.updated', 'Datos de contacto actualizados'));
        } catch (error) {
            console.error('Contact update error:', error);
            this.showMessage('error', this.t('profile.contact.error', 'No se pudieron actualizar tus datos'));
        }
    }

    sanitizePhone(value) {
        const cleaned = value.replace(/[^0-9+\s()-]/g, '');
        if (cleaned && cleaned.replace(/[^0-9]/g, '').length < 7) {
            return false;
        }
        return cleaned || null;
    }

    async handleAccountDeletion() {
        if (!this.state.user) {
            return;
        }

        const confirmation = confirm(this.t('profile.delete.confirmation', '¿Seguro que deseas solicitar la eliminación de tu cuenta? Recibirás un correo para confirmar.'));
        if (!confirmation) {
            return;
        }

        try {
            const email = this.state.user.email;
            if (!this.supabase.functions || typeof this.supabase.functions.invoke !== 'function') {
                throw new Error('Supabase Edge Functions are not available');
            }

            const { error } = await this.supabase.functions.invoke('request-account-deletion', {
                body: {
                    user_id: this.state.user.id,
                    email: email
                }
            });

            if (error) {
                throw error;
            }

            this.showMessage('success', this.t('profile.delete.sent', 'Hemos enviado un correo para confirmar la eliminación de tu cuenta.'));
        } catch (error) {
            console.error('Account deletion request error:', error);
            this.showMessage('error', this.t('profile.delete.error', 'No se pudo solicitar la eliminación. Inténtalo más tarde.'));
        }
    }

    populateHeader(user, propietario) {
        const name = propietario?.nombre || user.email || this.t('profile.menu.title', 'Tu cuenta');
        const email = propietario?.email || user.email || '-';
        const initials = this.buildInitials(name);

        if (this.profileNameSmall) {
            this.profileNameSmall.textContent = name;
        }
        if (this.profileNameLarge) {
            this.profileNameLarge.textContent = name;
        }
        if (this.profileEmailSmall) {
            this.profileEmailSmall.textContent = email;
            this.profileEmailSmall.title = email;
        }
        if (this.profileEmailLarge) {
            this.profileEmailLarge.textContent = email;
        }
        if (this.avatarSmall) {
            this.avatarSmall.textContent = initials;
        }
        if (this.avatarLarge) {
            this.avatarLarge.textContent = initials;
        }
    }

    buildInitials(name) {
        if (!name) {
            return '--';
        }
        const parts = name.split(' ').filter(Boolean);
        if (!parts.length) {
            return '--';
        }
        const initials = parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
        return initials || '--';
    }

    toggleDrawer(shouldOpen) {
        if (shouldOpen) {
            this.drawer.classList.add('open');
            this.drawer.setAttribute('aria-hidden', 'false');
            this.trigger.setAttribute('aria-expanded', 'true');
            document.body.classList.add('profile-open');
            if (this.backdrop) {
                this.backdrop.removeAttribute('hidden');
            }
            document.addEventListener('keydown', this.handleKeydown);
            document.addEventListener('click', this.onDocumentClick);
            this.refreshData(false);
        } else {
            this.drawer.classList.remove('open');
            this.drawer.setAttribute('aria-hidden', 'true');
            this.trigger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('profile-open');
            if (this.backdrop) {
                this.backdrop.setAttribute('hidden', '');
            }
            document.removeEventListener('keydown', this.handleKeydown);
            document.removeEventListener('click', this.onDocumentClick);
        }
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.toggleDrawer(false);
        }
    }

    onDocumentClick(event) {
        if (!this.drawer.classList.contains('open')) {
            return;
        }
        if (this.trigger.contains(event.target)) {
            return;
        }
        if (!this.drawer.contains(event.target)) {
            this.toggleDrawer(false);
        }
    }

    ensureDrawerRemainsOpen() {
        if (!this.drawer.classList.contains('open')) {
            this.toggleDrawer(true);
        }
    }

    toggleThemeFallback() {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', nextTheme);
    }

    showMessage(type, text) {
        if (!this.messageBox) {
            return;
        }

        this.messageBox.textContent = text;
        this.messageBox.className = 'profile-message show';

        if (type === 'success') {
            this.messageBox.classList.add('success');
        } else if (type === 'error') {
            this.messageBox.classList.add('error');
        } else {
            this.messageBox.classList.add('info');
        }

        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }

        this.messageTimeout = setTimeout(() => {
            this.clearMessage();
        }, 5000);
    }

    clearMessage() {
        if (!this.messageBox) {
            return;
        }
        this.messageBox.textContent = '';
        this.messageBox.className = 'profile-message';
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
            this.messageTimeout = null;
        }
    }

    t(key, fallback) {
        if (window.i18n && typeof window.i18n.translate === 'function') {
            return window.i18n.translate(key) || fallback;
        }
        return fallback;
    }
}
