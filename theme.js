// Sistema de temas para L2H
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('l2h-theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
    }

    createThemeToggle() {
        // Crear botón de tema si no existe
        if (!document.getElementById('theme-toggle')) {
            const toggle = document.createElement('button');
            toggle.id = 'theme-toggle';
            toggle.className = 'theme-toggle';
            toggle.setAttribute('aria-label', 'Cambiar tema');
            toggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
            toggle.addEventListener('click', () => this.toggleTheme());
            
            // Añadir al body
            document.body.appendChild(toggle);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('l2h-theme', newTheme);
        this.currentTheme = newTheme;
        
        // Actualizar emoji del botón
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
        }
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            // Tema oscuro
            root.style.setProperty('--bg-primary', '#1a202c');
            root.style.setProperty('--bg-secondary', '#2d3748');
            root.style.setProperty('--text-primary', '#e2e8f0');
            root.style.setProperty('--text-secondary', '#cbd5e0');
            root.style.setProperty('--border-color', '#4a5568');
            root.style.setProperty('--card-bg', '#2d3748');
            root.style.setProperty('--shadow', '0 1px 4px rgba(0, 0, 0, 0.4)');
            root.style.setProperty('--input-bg', '#1a202c');
            root.style.setProperty('--input-border', '#4a5568');
            root.style.setProperty('--hover-bg', '#374151');
            root.style.setProperty('--accent-light', '#60a5fa');
        } else {
            // Tema claro
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f7fafc');
            root.style.setProperty('--text-primary', '#4a5568');
            root.style.setProperty('--text-secondary', '#718096');
            root.style.setProperty('--border-color', '#cbd5e0');
            root.style.setProperty('--card-bg', '#ffffff');
            root.style.setProperty('--shadow', '0 10px 30px rgba(0, 0, 0, 0.08)');
            root.style.setProperty('--input-bg', '#ffffff');
            root.style.setProperty('--input-border', '#cbd5e0');
            root.style.setProperty('--hover-bg', '#edf2f7');
            root.style.setProperty('--accent-light', '#667eea');
        }
        
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Inicializar tema cuando el DOM esté listo
function initializeThemeManager() {
    const manager = new ThemeManager();
    window.themeManager = manager;
    return manager;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeThemeManager();
    });
} else {
    initializeThemeManager();
}
