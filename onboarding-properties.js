// Onboarding Properties - Script para agregar viviendas después del registro

(function() {
    document.addEventListener('DOMContentLoaded', async () => {
        const supabaseClient = window.supabaseClient ?? (typeof supabase !== 'undefined' ? supabase : null);

        if (!supabaseClient) {
            console.error('Supabase client is not available');
            window.location.href = 'login.html';
            return;
        }

        const onboarding = new PropertyOnboarding({
            supabase: supabaseClient
        });

        try {
            await onboarding.init();
        } catch (error) {
            console.error('Onboarding initialization failed:', error);
            window.location.href = 'login.html';
        }
    });
})();

class PropertyOnboarding {
    constructor({ supabase }) {
        this.supabase = supabase;
        this.user = null;
        this.propietario = null;
        this.properties = [];

        // DOM Elements
        this.propertyForm = document.getElementById('propertyForm');
        this.alert = document.getElementById('alert');
        this.addPropertyBtn = document.getElementById('addPropertyBtn');
        this.continueBtn = document.getElementById('continueBtn');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.propertiesList = document.getElementById('propertiesList');
        this.propertiesContainer = document.getElementById('propertiesContainer');

        // Form Fields
        this.bloqueSelect = document.getElementById('bloque');
        this.portalSelect = document.getElementById('portal');
        this.plantaSelect = document.getElementById('planta');
        this.letraSelect = document.getElementById('letra');
        this.tipoSelect = document.getElementById('tipo');
    }

    async init() {
        // Verificar autenticación
        const { data, error } = await this.supabase.auth.getUser();
        if (error || !data?.user) {
            throw new Error('User not authenticated');
        }

        this.user = data.user;

        // Cargar datos del propietario si existen
        await this.loadPropietarioData();

        // Bindear eventos
        this.bindEvents();

        // Renderizar propiedades existentes
        this.renderProperties();
    }

    async loadPropietarioData() {
        try {
            const { data, error } = await this.supabase
                .from('propietarios')
                .select('*')
                .eq('user_id', this.user.id)
                .maybeSingle();

            if (error) {
                console.error('Error loading propietario:', error);
                return;
            }

            if (data) {
                this.propietario = data;
                // Agregar la vivienda principal a la lista
                this.properties.push({
                    bloque: data.bloque,
                    portal: data.portal,
                    planta: data.planta,
                    letra: data.letra,
                    tipo: data.tipo_propietario,
                    isPrimary: true
                });
            }
        } catch (error) {
            console.error('Error in loadPropietarioData:', error);
        }
    }

    bindEvents() {
        if (this.propertyForm) {
            this.propertyForm.addEventListener('submit', (e) => this.handleAddProperty(e));
        }

        if (this.continueBtn) {
            this.continueBtn.addEventListener('click', () => this.continueToDashboard());
        }

        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    async handleAddProperty(event) {
        event.preventDefault();

        const bloque = this.bloqueSelect.value;
        const portal = this.portalSelect.value;
        const planta = this.plantaSelect.value;
        const letra = this.letraSelect.value;
        const tipo = this.tipoSelect.value;

        // Validar que todos los campos estén completos
        if (!bloque || !portal || !planta || !letra || !tipo) {
            this.showAlert('error', this.t('onboarding.error.required', 'Completa todos los campos'));
            return;
        }

        // Validar que la propiedad no sea duplicada
        const isDuplicate = this.properties.some(p =>
            p.bloque === bloque && p.portal === portal && p.planta === planta && p.letra === letra
        );

        if (isDuplicate) {
            this.showAlert('error', this.t('onboarding.error.duplicate', 'Esta vivienda ya fue agregada'));
            return;
        }

        this.setLoading(true);
        this.showAlert('info', this.t('onboarding.saving', 'Guardando vivienda...'));

        try {
            // Si es la primera propiedad, guardarla en propietarios
            if (!this.propietario) {
                const { error: propError } = await this.supabase
                    .from('propietarios')
                    .insert([{
                        user_id: this.user.id,
                        email: this.user.email,
                        bloque,
                        portal,
                        planta,
                        letra,
                        tipo_propietario: tipo
                    }]);

                if (propError) {
                    throw propError;
                }

                this.propietario = {
                    bloque,
                    portal,
                    planta,
                    letra,
                    tipo_propietario: tipo
                };

                this.properties.push({
                    bloque,
                    portal,
                    planta,
                    letra,
                    tipo,
                    isPrimary: true
                });
            } else {
                // Si ya existe propietario, agregar como propiedad adicional
                const { error: addError } = await this.supabase
                    .from('propiedades_adicionales')
                    .insert([{
                        user_id: this.user.id,
                        bloque,
                        portal,
                        planta,
                        letra
                    }]);

                if (addError) {
                    throw addError;
                }

                this.properties.push({
                    bloque,
                    portal,
                    planta,
                    letra,
                    tipo,
                    isPrimary: false
                });
            }

            this.showAlert('success', this.t('onboarding.success', 'Vivienda agregada correctamente'));
            this.propertyForm.reset();
            this.renderProperties();

            // Mostrar botón de continuar si hay propiedades
            if (this.properties.length > 0) {
                this.continueBtn.removeAttribute('hidden');
            }

        } catch (error) {
            console.error('Error adding property:', error);
            this.showAlert('error', this.t('onboarding.error.save', 'No se pudo guardar la vivienda'));
        } finally {
            this.setLoading(false);
        }
    }

    renderProperties() {
        if (this.properties.length === 0) {
            this.propertiesList.setAttribute('hidden', '');
            this.continueBtn.setAttribute('hidden', '');
            return;
        }

        this.propertiesList.removeAttribute('hidden');

        this.propertiesContainer.innerHTML = '';

        this.properties.forEach((property, index) => {
            const item = document.createElement('div');
            item.className = 'property-item';

            const info = document.createElement('div');
            info.className = 'property-info';

            const label = document.createElement('div');
            label.className = 'property-label';
            label.textContent = `Bloque ${property.bloque} · Portal ${property.portal} · ${property.planta}º ${property.letra}`;

            const meta = document.createElement('div');
            meta.className = 'property-meta';
            meta.textContent = `${property.tipo}${property.isPrimary ? ' (Principal)' : ''}`;

            info.appendChild(label);
            info.appendChild(meta);

            // Botón de eliminar solo para propiedades adicionales
            if (!property.isPrimary && this.properties.length > 1) {
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'property-btn';
                removeBtn.textContent = 'Eliminar';
                removeBtn.addEventListener('click', () => this.removeProperty(index));
                item.appendChild(info);
                item.appendChild(removeBtn);
            } else {
                item.appendChild(info);
            }

            this.propertiesContainer.appendChild(item);
        });
    }

    removeProperty(index) {
        if (this.properties[index].isPrimary) {
            this.showAlert('error', this.t('onboarding.error.removePrimary', 'No puedes eliminar la vivienda principal'));
            return;
        }

        this.properties.splice(index, 1);
        this.renderProperties();

        if (this.properties.length === 0) {
            this.continueBtn.setAttribute('hidden', '');
        }
    }

    continueToDashboard() {
        // Si hay propiedades, ir al dashboard
        if (this.properties.length > 0) {
            window.location.href = 'dashboard.html';
        } else {
            this.showAlert('error', this.t('onboarding.error.required', 'Debe agregar al menos una vivienda'));
        }
    }

    async handleLogout() {
        try {
            await this.supabase.auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    setLoading(isLoading) {
        this.addPropertyBtn.disabled = isLoading;
        if (isLoading) {
            this.addPropertyBtn.classList.add('loading');
        } else {
            this.addPropertyBtn.classList.remove('loading');
        }
    }

    showAlert(type, message) {
        this.alert.className = `alert alert-${type} show`;
        this.alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        if (type !== 'info') {
            setTimeout(() => {
                this.alert.classList.remove('show');
            }, 5000);
        }
    }

    t(key, fallback) {
        if (window.i18n && typeof window.i18n.translate === 'function') {
            return window.i18n.translate(key) || fallback;
        }
        return fallback;
    }
}
