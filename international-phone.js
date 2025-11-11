// ============================================================================
// INTERNATIONAL PHONE NUMBER CLASS - L2H Community
// ============================================================================
// Manages phone numbers with international country codes and flags

class InternationalPhoneNumber {
    constructor(containerId, onChangeCallback = null) {
        this.container = document.getElementById(containerId);
        this.onChangeCallback = onChangeCallback;
        this.selectedCountry = null;
        this.phoneInput = null;
        this.countrySelect = null;
        this.fullPhoneDisplay = null;

        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.countryData = this.getCountryData();
        this.render();
        this.bindEvents();
    }

    getCountryData() {
        return [
            { code: '+1', country: 'United States', flag: '🇺🇸', iso: 'US' },
            { code: '+1', country: 'Canada', flag: '🇨🇦', iso: 'CA' },
            { code: '+1', country: 'Mexico', flag: '🇲🇽', iso: 'MX' },
            { code: '+7', country: 'Russia', flag: '🇷🇺', iso: 'RU' },
            { code: '+7', country: 'Kazakhstan', flag: '🇰🇿', iso: 'KZ' },
            { code: '+20', country: 'Egypt', flag: '🇪🇬', iso: 'EG' },
            { code: '+27', country: 'South Africa', flag: '🇿🇦', iso: 'ZA' },
            { code: '+30', country: 'Greece', flag: '🇬🇷', iso: 'GR' },
            { code: '+31', country: 'Netherlands', flag: '🇳🇱', iso: 'NL' },
            { code: '+32', country: 'Belgium', flag: '🇧🇪', iso: 'BE' },
            { code: '+33', country: 'France', flag: '🇫🇷', iso: 'FR' },
            { code: '+34', country: 'Spain', flag: '🇪🇸', iso: 'ES' },
            { code: '+36', country: 'Hungary', flag: '🇭🇺', iso: 'HU' },
            { code: '+39', country: 'Italy', flag: '🇮🇹', iso: 'IT' },
            { code: '+40', country: 'Romania', flag: '🇷🇴', iso: 'RO' },
            { code: '+41', country: 'Switzerland', flag: '🇨🇭', iso: 'CH' },
            { code: '+43', country: 'Austria', flag: '🇦🇹', iso: 'AT' },
            { code: '+44', country: 'United Kingdom', flag: '🇬🇧', iso: 'GB' },
            { code: '+45', country: 'Denmark', flag: '🇩🇰', iso: 'DK' },
            { code: '+46', country: 'Sweden', flag: '🇸🇪', iso: 'SE' },
            { code: '+47', country: 'Norway', flag: '🇳🇴', iso: 'NO' },
            { code: '+48', country: 'Poland', flag: '🇵🇱', iso: 'PL' },
            { code: '+49', country: 'Germany', flag: '🇩🇪', iso: 'DE' },
            { code: '+51', country: 'Peru', flag: '🇵🇪', iso: 'PE' },
            { code: '+52', country: 'Mexico', flag: '🇲🇽', iso: 'MX' },
            { code: '+53', country: 'Cuba', flag: '🇨🇺', iso: 'CU' },
            { code: '+54', country: 'Argentina', flag: '🇦🇷', iso: 'AR' },
            { code: '+55', country: 'Brazil', flag: '🇧🇷', iso: 'BR' },
            { code: '+56', country: 'Chile', flag: '🇨🇱', iso: 'CL' },
            { code: '+57', country: 'Colombia', flag: '🇨🇴', iso: 'CO' },
            { code: '+58', country: 'Venezuela', flag: '🇻🇪', iso: 'VE' },
            { code: '+60', country: 'Malaysia', flag: '🇲🇾', iso: 'MY' },
            { code: '+61', country: 'Australia', flag: '🇦🇺', iso: 'AU' },
            { code: '+62', country: 'Indonesia', flag: '🇮🇩', iso: 'ID' },
            { code: '+63', country: 'Philippines', flag: '🇵🇭', iso: 'PH' },
            { code: '+64', country: 'New Zealand', flag: '🇳🇿', iso: 'NZ' },
            { code: '+65', country: 'Singapore', flag: '🇸🇬', iso: 'SG' },
            { code: '+66', country: 'Thailand', flag: '🇹🇭', iso: 'TH' },
            { code: '+81', country: 'Japan', flag: '🇯🇵', iso: 'JP' },
            { code: '+82', country: 'South Korea', flag: '🇰🇷', iso: 'KR' },
            { code: '+84', country: 'Vietnam', flag: '🇻🇳', iso: 'VN' },
            { code: '+86', country: 'China', flag: '🇨🇳', iso: 'CN' },
            { code: '+90', country: 'Turkey', flag: '🇹🇷', iso: 'TR' },
            { code: '+91', country: 'India', flag: '🇮🇳', iso: 'IN' },
            { code: '+92', country: 'Pakistan', flag: '🇵🇰', iso: 'PK' },
            { code: '+93', country: 'Afghanistan', flag: '🇦🇫', iso: 'AF' },
            { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', iso: 'LK' },
            { code: '+95', country: 'Myanmar', flag: '🇲🇲', iso: 'MM' },
            { code: '+98', country: 'Iran', flag: '🇮🇷', iso: 'IR' },
            { code: '+212', country: 'Morocco', flag: '🇲🇦', iso: 'MA' },
            { code: '+213', country: 'Algeria', flag: '🇩🇿', iso: 'DZ' },
            { code: '+216', country: 'Tunisia', flag: '🇹🇳', iso: 'TN' },
            { code: '+218', country: 'Libya', flag: '🇱🇾', iso: 'LY' },
            { code: '+220', country: 'Gambia', flag: '🇬🇲', iso: 'GM' },
            { code: '+221', country: 'Senegal', flag: '🇸🇳', iso: 'SN' },
            { code: '+222', country: 'Mauritania', flag: '🇲🇷', iso: 'MR' },
            { code: '+223', country: 'Mali', flag: '🇲🇱', iso: 'ML' },
            { code: '+224', country: 'Guinea', flag: '🇬🇳', iso: 'GN' },
            { code: '+225', country: 'Ivory Coast', flag: '🇨🇮', iso: 'CI' },
            { code: '+226', country: 'Burkina Faso', flag: '🇧🇫', iso: 'BF' },
            { code: '+227', country: 'Niger', flag: '🇳🇪', iso: 'NE' },
            { code: '+228', country: 'Togo', flag: '🇹🇬', iso: 'TG' },
            { code: '+229', country: 'Benin', flag: '🇧🇯', iso: 'BJ' },
            { code: '+230', country: 'Mauritius', flag: '🇲🇺', iso: 'MU' },
            { code: '+231', country: 'Liberia', flag: '🇱🇷', iso: 'LR' },
            { code: '+232', country: 'Sierra Leone', flag: '🇸🇱', iso: 'SL' },
            { code: '+233', country: 'Ghana', flag: '🇬🇭', iso: 'GH' },
            { code: '+234', country: 'Nigeria', flag: '🇳🇬', iso: 'NG' },
            { code: '+235', country: 'Chad', flag: '🇹🇩', iso: 'TD' },
            { code: '+236', country: 'Central African Republic', flag: '🇨🇫', iso: 'CF' },
            { code: '+237', country: 'Cameroon', flag: '🇨🇲', iso: 'CM' },
            { code: '+238', country: 'Cape Verde', flag: '🇨🇻', iso: 'CV' },
            { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹', iso: 'ST' },
            { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶', iso: 'GQ' },
            { code: '+241', country: 'Gabon', flag: '🇬🇦', iso: 'GA' },
            { code: '+242', country: 'Republic of the Congo', flag: '🇨🇬', iso: 'CG' },
            { code: '+243', country: 'Democratic Republic of the Congo', flag: '🇨🇩', iso: 'CD' },
            { code: '+244', country: 'Angola', flag: '🇦🇴', iso: 'AO' },
            { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼', iso: 'GW' },
            { code: '+246', country: 'Seychelles', flag: '🇸🇨', iso: 'SC' },
            { code: '+248', country: 'Seychelles', flag: '🇸🇨', iso: 'SC' },
            { code: '+249', country: 'Sudan', flag: '🇸🇩', iso: 'SD' },
            { code: '+250', country: 'Rwanda', flag: '🇷🇼', iso: 'RW' },
            { code: '+251', country: 'Ethiopia', flag: '🇪🇹', iso: 'ET' },
            { code: '+252', country: 'Somalia', flag: '🇸🇴', iso: 'SO' },
            { code: '+253', country: 'Djibouti', flag: '🇩🇯', iso: 'DJ' },
            { code: '+254', country: 'Kenya', flag: '🇰🇪', iso: 'KE' },
            { code: '+255', country: 'Tanzania', flag: '🇹🇿', iso: 'TZ' },
            { code: '+256', country: 'Uganda', flag: '🇺🇬', iso: 'UG' },
            { code: '+257', country: 'Burundi', flag: '🇧🇮', iso: 'BI' },
            { code: '+258', country: 'Mozambique', flag: '🇲🇿', iso: 'MZ' },
            { code: '+260', country: 'Zambia', flag: '🇿🇲', iso: 'ZM' },
            { code: '+261', country: 'Madagascar', flag: '🇲🇬', iso: 'MG' },
            { code: '+262', country: 'Réunion', flag: '🇷🇪', iso: 'RE' },
            { code: '+263', country: 'Zimbabwe', flag: '🇿🇼', iso: 'ZW' },
            { code: '+264', country: 'Namibia', flag: '🇳🇦', iso: 'NA' },
            { code: '+265', country: 'Malawi', flag: '🇲🇼', iso: 'MW' },
            { code: '+266', country: 'Lesotho', flag: '🇱🇸', iso: 'LS' },
            { code: '+267', country: 'Botswana', flag: '🇧🇼', iso: 'BW' },
            { code: '+268', country: 'Eswatini', flag: '🇸🇿', iso: 'SZ' },
            { code: '+290', country: 'Saint Helena', flag: '🇸🇭', iso: 'SH' },
            { code: '+291', country: 'Eritrea', flag: '🇪🇷', iso: 'ER' },
            { code: '+297', country: 'Aruba', flag: '🇦🇼', iso: 'AW' },
            { code: '+298', country: 'Faroe Islands', flag: '🇫🇴', iso: 'FO' },
            { code: '+299', country: 'Greenland', flag: '🇬🇱', iso: 'GL' },
            { code: '+350', country: 'Gibraltar', flag: '🇬🇮', iso: 'GI' },
            { code: '+351', country: 'Portugal', flag: '🇵🇹', iso: 'PT' },
            { code: '+352', country: 'Luxembourg', flag: '🇱🇺', iso: 'LU' },
            { code: '+353', country: 'Ireland', flag: '🇮🇪', iso: 'IE' },
            { code: '+354', country: 'Iceland', flag: '🇮🇸', iso: 'IS' },
            { code: '+355', country: 'Albania', flag: '🇦🇱', iso: 'AL' },
            { code: '+356', country: 'Malta', flag: '🇲🇹', iso: 'MT' },
            { code: '+357', country: 'Cyprus', flag: '🇨🇾', iso: 'CY' },
            { code: '+358', country: 'Finland', flag: '🇫🇮', iso: 'FI' },
            { code: '+359', country: 'Bulgaria', flag: '🇧🇬', iso: 'BG' },
            { code: '+370', country: 'Lithuania', flag: '🇱🇹', iso: 'LT' },
            { code: '+371', country: 'Latvia', flag: '🇱🇻', iso: 'LV' },
            { code: '+372', country: 'Estonia', flag: '🇪🇪', iso: 'EE' },
            { code: '+373', country: 'Moldova', flag: '🇲🇩', iso: 'MD' },
            { code: '+374', country: 'Armenia', flag: '🇦🇲', iso: 'AM' },
            { code: '+375', country: 'Belarus', flag: '🇧🇾', iso: 'BY' },
            { code: '+376', country: 'Andorra', flag: '🇦🇩', iso: 'AD' },
            { code: '+377', country: 'Monaco', flag: '🇲🇨', iso: 'MC' },
            { code: '+378', country: 'San Marino', flag: '🇸🇲', iso: 'SM' },
            { code: '+380', country: 'Ukraine', flag: '🇺🇦', iso: 'UA' },
            { code: '+381', country: 'Serbia', flag: '🇷🇸', iso: 'RS' },
            { code: '+382', country: 'Montenegro', flag: '🇲🇪', iso: 'ME' },
            { code: '+383', country: 'Kosovo', flag: '🇽🇰', iso: 'XK' },
            { code: '+385', country: 'Croatia', flag: '🇭🇷', iso: 'HR' },
            { code: '+386', country: 'Slovenia', flag: '🇸🇮', iso: 'SI' },
            { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦', iso: 'BA' },
            { code: '+389', country: 'North Macedonia', flag: '🇲🇰', iso: 'MK' },
            { code: '+420', country: 'Czech Republic', flag: '🇨🇿', iso: 'CZ' },
            { code: '+421', country: 'Slovakia', flag: '🇸🇰', iso: 'SK' },
            { code: '+423', country: 'Liechtenstein', flag: '🇱🇮', iso: 'LI' },
            { code: '+500', country: 'Falkland Islands', flag: '🇫🇰', iso: 'FK' },
            { code: '+501', country: 'Belize', flag: '🇧🇿', iso: 'BZ' },
            { code: '+502', country: 'Guatemala', flag: '🇬🇹', iso: 'GT' },
            { code: '+503', country: 'El Salvador', flag: '🇸🇻', iso: 'SV' },
            { code: '+504', country: 'Honduras', flag: '🇭🇳', iso: 'HN' },
            { code: '+505', country: 'Nicaragua', flag: '🇳🇮', iso: 'NI' },
            { code: '+506', country: 'Costa Rica', flag: '🇨🇷', iso: 'CR' },
            { code: '+507', country: 'Panama', flag: '🇵🇦', iso: 'PA' },
            { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲', iso: 'PM' },
            { code: '+509', country: 'Haiti', flag: '🇭🇹', iso: 'HT' },
            { code: '+590', country: 'Guadeloupe', flag: '🇬🇵', iso: 'GP' },
            { code: '+591', country: 'Bolivia', flag: '🇧🇴', iso: 'BO' },
            { code: '+592', country: 'Guyana', flag: '🇬🇾', iso: 'GY' },
            { code: '+593', country: 'Ecuador', flag: '🇪🇨', iso: 'EC' },
            { code: '+594', country: 'French Guiana', flag: '🇬🇫', iso: 'GF' },
            { code: '+595', country: 'Paraguay', flag: '🇵🇾', iso: 'PY' },
            { code: '+596', country: 'Martinique', flag: '🇲🇶', iso: 'MQ' },
            { code: '+597', country: 'Suriname', flag: '🇸🇷', iso: 'SR' },
            { code: '+598', country: 'Uruguay', flag: '🇺🇾', iso: 'UY' },
            { code: '+599', country: 'Netherlands Antilles', flag: '🇧🇶', iso: 'BQ' },
            { code: '+670', country: 'East Timor', flag: '🇹🇱', iso: 'TL' },
            { code: '+672', country: 'Norfolk Island', flag: '🇳🇫', iso: 'NF' },
            { code: '+673', country: 'Brunei', flag: '🇧🇳', iso: 'BN' },
            { code: '+674', country: 'Nauru', flag: '🇳🇷', iso: 'NR' },
            { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬', iso: 'PG' },
            { code: '+676', country: 'Tonga', flag: '🇹🇴', iso: 'TO' },
            { code: '+677', country: 'Solomon Islands', flag: '🇸🇧', iso: 'SB' },
            { code: '+678', country: 'Vanuatu', flag: '🇻🇺', iso: 'VU' },
            { code: '+679', country: 'Fiji', flag: '🇫🇯', iso: 'FJ' },
            { code: '+680', country: 'Palau', flag: '🇵🇼', iso: 'PW' },
            { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫', iso: 'WF' },
            { code: '+682', country: 'Cook Islands', flag: '🇨🇰', iso: 'CK' },
            { code: '+683', country: 'Niue', flag: '🇳🇺', iso: 'NU' },
            { code: '+684', country: 'American Samoa', flag: '🇦🇸', iso: 'AS' },
            { code: '+685', country: 'Samoa', flag: '🇼🇸', iso: 'WS' },
            { code: '+686', country: 'Kiribati', flag: '🇰🇮', iso: 'KI' },
            { code: '+687', country: 'New Caledonia', flag: '🇳🇨', iso: 'NC' },
            { code: '+688', country: 'Tuvalu', flag: '🇹🇻', iso: 'TV' },
            { code: '+689', country: 'French Polynesia', flag: '🇵🇫', iso: 'PF' },
            { code: '+690', country: 'Tokelau', flag: '🇹🇰', iso: 'TK' },
            { code: '+691', country: 'Micronesia', flag: '🇫🇲', iso: 'FM' },
            { code: '+692', country: 'Marshall Islands', flag: '🇲🇭', iso: 'MH' },
            { code: '+850', country: 'North Korea', flag: '🇰🇵', iso: 'KP' },
            { code: '+852', country: 'Hong Kong', flag: '🇭🇰', iso: 'HK' },
            { code: '+853', country: 'Macao', flag: '🇲🇴', iso: 'MO' },
            { code: '+855', country: 'Cambodia', flag: '🇰🇭', iso: 'KH' },
            { code: '+856', country: 'Laos', flag: '🇱🇦', iso: 'LA' },
            { code: '+880', country: 'Bangladesh', flag: '🇧🇩', iso: 'BD' },
            { code: '+886', country: 'Taiwan', flag: '🇹🇼', iso: 'TW' },
            { code: '+960', country: 'Maldives', flag: '🇲🇻', iso: 'MV' },
            { code: '+961', country: 'Lebanon', flag: '🇱🇧', iso: 'LB' },
            { code: '+962', country: 'Jordan', flag: '🇯🇴', iso: 'JO' },
            { code: '+963', country: 'Syria', flag: '🇸🇾', iso: 'SY' },
            { code: '+964', country: 'Iraq', flag: '🇮🇶', iso: 'IQ' },
            { code: '+965', country: 'Kuwait', flag: '🇰🇼', iso: 'KW' },
            { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', iso: 'SA' },
            { code: '+967', country: 'Yemen', flag: '🇾🇪', iso: 'YE' },
            { code: '+968', country: 'Oman', flag: '🇴🇲', iso: 'OM' },
            { code: '+970', country: 'Palestine', flag: '🇵🇸', iso: 'PS' },
            { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪', iso: 'AE' },
            { code: '+972', country: 'Israel', flag: '🇮🇱', iso: 'IL' },
            { code: '+973', country: 'Bahrain', flag: '🇧🇭', iso: 'BH' },
            { code: '+974', country: 'Qatar', flag: '🇶🇦', iso: 'QA' },
            { code: '+975', country: 'Bhutan', flag: '🇧🇹', iso: 'BT' },
            { code: '+976', country: 'Mongolia', flag: '🇲🇳', iso: 'MN' },
            { code: '+977', country: 'Nepal', flag: '🇳🇵', iso: 'NP' },
            { code: '+992', country: 'Tajikistan', flag: '🇹🇯', iso: 'TJ' },
            { code: '+993', country: 'Turkmenistan', flag: '🇹🇲', iso: 'TM' },
            { code: '+994', country: 'Azerbaijan', flag: '🇦🇿', iso: 'AZ' },
            { code: '+995', country: 'Georgia', flag: '🇬🇪', iso: 'GE' },
            { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬', iso: 'KG' },
            { code: '+998', country: 'Uzbekistan', flag: '🇺🇿', iso: 'UZ' }
        ];
    }

    render() {
        this.container.innerHTML = `
            <div class="phone-number-wrapper">
                <div class="phone-country-select-wrapper">
                    <select class="phone-country-select" id="phoneCountrySelect">
                        <option value="">-- Selecciona País / Select Country --</option>
                    </select>
                </div>
                <div class="phone-number-input-wrapper">
                    <input 
                        type="tel" 
                        class="phone-number-input" 
                        id="phoneNumberInput" 
                        placeholder="1234567890"
                        maxlength="15"
                        autocomplete="tel"
                    >
                </div>
                <div class="phone-full-display">
                    <span id="phoneFullDisplay" class="phone-full-value">+XX XXXXXXXXXX</span>
                </div>
            </div>
        `;

        this.countrySelect = document.getElementById('phoneCountrySelect');
        this.phoneInput = document.getElementById('phoneNumberInput');
        this.fullPhoneDisplay = document.getElementById('phoneFullDisplay');

        // Populate country dropdown
        const sortedCountries = [...this.countryData].sort((a, b) => 
            a.country.localeCompare(b.country)
        );

        sortedCountries.forEach(item => {
            const option = document.createElement('option');
            option.value = JSON.stringify(item);
            option.textContent = `${item.flag} ${item.country} (${item.code})`;
            this.countrySelect.appendChild(option);
        });

        this.addStyles();
    }

    bindEvents() {
        if (this.countrySelect) {
            this.countrySelect.addEventListener('change', () => this.updatePhoneDisplay());
        }
        if (this.phoneInput) {
            this.phoneInput.addEventListener('input', () => {
                // Only allow digits
                this.phoneInput.value = this.phoneInput.value.replace(/\D/g, '');
                this.updatePhoneDisplay();
            });
        }
    }

    updatePhoneDisplay() {
        const countryValue = this.countrySelect?.value;
        const phoneNumber = this.phoneInput?.value || '';

        if (countryValue) {
            try {
                this.selectedCountry = JSON.parse(countryValue);
                const fullNumber = `${this.selectedCountry.code}${phoneNumber}`;
                if (this.fullPhoneDisplay) {
                    this.fullPhoneDisplay.textContent = phoneNumber ? fullNumber : this.selectedCountry.code;
                }
            } catch (e) {
                console.error('Error parsing country value:', e);
            }
        } else {
            if (this.fullPhoneDisplay) {
                this.fullPhoneDisplay.textContent = '+XX XXXXXXXXXX';
            }
        }

        // Call the callback if provided
        if (this.onChangeCallback) {
            this.onChangeCallback(this.getFullPhoneNumber());
        }
    }

    getFullPhoneNumber() {
        if (!this.selectedCountry || !this.phoneInput?.value) {
            return null;
        }
        return `${this.selectedCountry.code}${this.phoneInput.value}`;
    }

    setPhoneNumber(fullPhoneNumber) {
        if (!fullPhoneNumber) return;

        // Try to match the country code
        for (const item of this.countryData) {
            if (fullPhoneNumber.startsWith(item.code)) {
                this.selectedCountry = item;
                this.countrySelect.value = JSON.stringify(item);
                
                const phoneOnly = fullPhoneNumber.substring(item.code.length);
                this.phoneInput.value = phoneOnly;
                
                this.updatePhoneDisplay();
                return true;
            }
        }
        return false;
    }

    getCountryFlag() {
        return this.selectedCountry?.flag || '';
    }

    getCountryCode() {
        return this.selectedCountry?.code || '';
    }

    getPhoneNumberOnly() {
        return this.phoneInput?.value || '';
    }

    addStyles() {
        if (document.getElementById('phone-number-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'phone-number-styles';
        style.textContent = `
            .phone-number-wrapper {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                align-items: flex-end;
            }

            .phone-country-select-wrapper {
                flex: 0 1 200px;
                min-width: 150px;
            }

            .phone-country-select {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #cbd5e0;
                border-radius: 6px;
                background: white;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #2d3748;
            }

            .phone-country-select:hover {
                border-color: #a0aec0;
                background: #f7fafc;
            }

            .phone-country-select:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            html[data-theme="dark"] .phone-country-select {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }

            html[data-theme="dark"] .phone-country-select:hover {
                background: #4a5568;
                border-color: #718096;
            }

            html[data-theme="dark"] .phone-country-select:focus {
                border-color: #667eea;
            }

            .phone-number-input-wrapper {
                flex: 1;
                min-width: 150px;
            }

            .phone-number-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #cbd5e0;
                border-radius: 6px;
                font-size: 13px;
                transition: all 0.2s ease;
                color: #2d3748;
            }

            .phone-number-input::placeholder {
                color: #a0aec0;
            }

            .phone-number-input:hover {
                border-color: #a0aec0;
            }

            .phone-number-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            html[data-theme="dark"] .phone-number-input {
                background: #1a202c;
                border-color: #4a5568;
                color: #e2e8f0;
            }

            html[data-theme="dark"] .phone-number-input::placeholder {
                color: #718096;
            }

            html[data-theme="dark"] .phone-number-input:hover {
                border-color: #718096;
            }

            html[data-theme="dark"] .phone-number-input:focus {
                border-color: #667eea;
            }

            .phone-full-display {
                padding: 10px 12px;
                background: #f7fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                color: #2d3748;
                min-width: 140px;
                text-align: center;
                word-break: break-all;
            }

            html[data-theme="dark"] .phone-full-display {
                background: #2d3748;
                border-color: #4a5568;
                color: #cbd5e0;
            }

            @media (max-width: 600px) {
                .phone-number-wrapper {
                    flex-direction: column;
                    gap: 8px;
                }

                .phone-country-select-wrapper,
                .phone-number-input-wrapper,
                .phone-full-display {
                    width: 100%;
                }

                .phone-full-display {
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InternationalPhoneNumber;
}
