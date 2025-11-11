/**
 * Reset Password Handler
 * Manages password reset flow with token validation
 */

class PasswordResetManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.i18n = window.i18n;
        this.accessToken = null;
        this.init();
    }

    async init() {
        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        this.accessToken = urlParams.get('access_token');

        if (!this.accessToken) {
            this.showError(this.i18n.t('password.recovery.invalidToken') || 'Invalid or expired reset link');
            setTimeout(() => {
                window.location.href = 'forgot-password.html';
            }, 3000);
            return;
        }

        this.attachEventListeners();
        this.updateUILabels();
    }

    attachEventListeners() {
        const form = document.getElementById('reset-password-form');
        const newPasswordInput = document.getElementById('new-password');
        const submitBtn = document.getElementById('submit-btn');

        if (!form || !newPasswordInput || !submitBtn) {
            console.error('Required form elements not found');
            return;
        }

        // Password strength checker on input
        newPasswordInput.addEventListener('input', (e) => {
            this.validatePasswordStrength(e.target.value);
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleResetPassword();
        });
    }

    validatePasswordStrength(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        };

        // Update requirement indicators
        this.updateRequirement('length', requirements.length);
        this.updateRequirement('uppercase', requirements.uppercase);
        this.updateRequirement('lowercase', requirements.lowercase);
        this.updateRequirement('number', requirements.number);

        // Calculate strength
        const metCount = Object.values(requirements).filter(Boolean).length;
        const strength = metCount <= 1 ? 'weak' : metCount <= 2 ? 'medium' : metCount <= 3 ? 'strong' : 'strong';

        // Update strength bar
        const strengthBar = document.getElementById('strength-bar-fill');
        const strengthText = document.getElementById('strength-text');

        if (strengthBar) {
            strengthBar.className = `strength-bar-fill ${strength}`;
            strengthBar.style.width = `${(metCount / 4) * 100}%`;
        }

        if (strengthText) {
            const strengthLabel = strength.charAt(0).toUpperCase() + strength.slice(1);
            const text = this.i18n.t(`password.strength.${strength}`) || `Password Strength: ${strengthLabel}`;
            strengthText.textContent = text;
        }

        return Object.values(requirements).every(Boolean);
    }

    updateRequirement(requirement, met) {
        const element = document.getElementById(`req-${requirement}`);
        if (element) {
            if (met) {
                element.classList.add('met');
            } else {
                element.classList.remove('met');
            }
        }
    }

    validatePassword(password, confirmPassword) {
        // Check if passwords match
        if (password !== confirmPassword) {
            this.showError(this.i18n.t('password.error.mismatch') || 'Passwords do not match');
            return false;
        }

        // Check strength requirements
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        };

        if (!Object.values(requirements).every(Boolean)) {
            this.showError(this.i18n.t('password.error.weak') || 'Password does not meet requirements');
            return false;
        }

        return true;
    }

    async handleResetPassword() {
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const submitBtn = document.getElementById('submit-btn');

        // Validate passwords
        if (!this.validatePassword(newPassword, confirmPassword)) {
            return;
        }

        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            const btnText = document.getElementById('btn-text');
            if (btnText) {
                btnText.innerHTML = `<span class="loading"></span>${this.i18n.t('message.loading') || 'Loading...'}`;
            }
        }

        try {
            // Update password using access token
            const { data, error } = await this.supabase.auth.updateUser(
                { password: newPassword },
                { accessToken: this.accessToken }
            );

            if (error) {
                throw new Error(error.message);
            }

            // Show success message
            this.showSuccess();

            // Redirect to login after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            console.error('Password reset error:', error);
            const errorMessage = this.mapErrorToMessage(error.message);
            this.showError(errorMessage);

            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                const btnText = document.getElementById('btn-text');
                if (btnText) {
                    btnText.textContent = this.i18n.t('password.change.button') || 'Reset Password';
                }
            }
        }
    }

    mapErrorToMessage(error) {
        if (error.includes('invalid')) {
            return this.i18n.t('password.recovery.invalidToken') || 'Invalid or expired reset link. Please request a new one.';
        }
        if (error.includes('weak')) {
            return this.i18n.t('password.error.weak') || 'Password does not meet security requirements.';
        }
        if (error.includes('same')) {
            return this.i18n.t('password.error.same') || 'New password must be different from current password.';
        }
        return this.i18n.t('message.error') || 'An error occurred during password reset. Please try again.';
    }

    showSuccess() {
        const formContainer = document.getElementById('form-container');
        const successContainer = document.getElementById('success-container');

        if (formContainer) {
            formContainer.style.display = 'none';
        }

        if (successContainer) {
            successContainer.classList.add('show');
        }

        // Update success message with translation
        const successTitle = document.getElementById('success-title');
        const successMessage = document.getElementById('success-message');

        if (successTitle) {
            successTitle.textContent = this.i18n.t('password.reset.success') || 'Password Reset Successful!';
        }

        if (successMessage) {
            successMessage.textContent = this.i18n.t('password.reset.message') || 'Your password has been successfully updated. You will be redirected to the login page.';
        }
    }

    showError(message) {
        const alertDiv = document.getElementById('alert');
        if (alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = 'alert alert-error show';
        }
    }

    updateUILabels() {
        // Update all UI labels with translations
        const labels = {
            'title': this.i18n.t('password.change.title') || 'Reset Password',
            'subtitle': this.i18n.t('password.change.subtitle') || 'Enter your new password below',
            'label-newPassword': this.i18n.t('password.change.newPassword') || 'New Password',
            'label-confirmPassword': this.i18n.t('register.confirmPassword') || 'Confirm Password',
            'btn-text': this.i18n.t('password.change.button') || 'Reset Password',
            'back-link': `← ${this.i18n.t('nav.back') || 'Back to login'}`,
            'req-length-text': this.i18n.t('password.req.length') || 'Minimum 8 characters',
            'req-uppercase-text': this.i18n.t('password.req.uppercase') || 'One uppercase letter',
            'req-lowercase-text': this.i18n.t('password.req.lowercase') || 'One lowercase letter',
            'req-number-text': this.i18n.t('password.req.number') || 'One number',
            'success-title': this.i18n.t('password.reset.success') || 'Password Reset Successful!',
            'success-message': this.i18n.t('password.reset.message') || 'Your password has been successfully updated.'
        };

        for (const [id, text] of Object.entries(labels)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        }
    }
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.supabaseClient && window.i18n) {
            new PasswordResetManager();
        } else {
            console.error('Required dependencies not loaded');
        }
    });
} else {
    if (window.supabaseClient && window.i18n) {
        new PasswordResetManager();
    } else {
        console.error('Required dependencies not loaded');
    }
}
