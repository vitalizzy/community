# 🏘️ Integración Supabase - L2H Community

## 📋 Guía de Configuración Paso a Paso

### 1️⃣ Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Haz clic en "New Project"
3. Completa los datos:
   - **Organization**: Crea una nueva o selecciona existente
   - **Name**: `lomas2-community`
   - **Database Password**: Genera una contraseña segura y guárdala
   - **Region**: Europe West (Frankfurt) - o la más cercana
   - **Pricing Plan**: Free (para empezar)
4. Haz clic en "Create new project" y espera 1-2 minutos

### 2️⃣ Obtener Credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) → **API**
2. Copia estos dos valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key (es una clave larga)

### 3️⃣ Configurar el Proyecto

1. Abre el archivo `supabase-config.js`
2. Reemplaza estos valores:
   ```javascript
   const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI'; // Pega tu Project URL
   const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI'; // Pega tu anon key
   ```

### 4️⃣ Crear la Tabla de Propietarios

1. En Supabase, ve a **SQL Editor** (icono de base de datos)
2. Haz clic en "New query"
3. Copia y pega TODO el contenido del archivo `supabase-schema.sql`
4. Haz clic en "Run" o presiona `Ctrl + Enter`
5. Deberías ver un mensaje de éxito

### 5️⃣ Configurar Autenticación por Email

1. Ve a **Authentication** → **Providers**
2. Busca "Email" y asegúrate de que esté **habilitado**
3. Configuración recomendada:
   - ✅ Enable email confirmations (confirmar email)
   - ✅ Enable email signups (permitir registros)
   - Template de confirmación: usar el predeterminado

### 6️⃣ Verificar Políticas de Seguridad (RLS)

1. Ve a **Database** → **Tables** → **propietarios**
2. En la pestaña **Policies**, deberías ver 3 políticas:
   - "Los usuarios pueden ver sus propios datos"
   - "Los usuarios pueden insertar sus propios datos"
   - "Los usuarios pueden actualizar sus propios datos"

### 7️⃣ Probar el Sistema

1. Abre tu proyecto en un navegador local
2. Ve a `register.html`
3. Completa el formulario con **todos los campos obligatorios**:
   - Nombre
   - Email
   - Contraseña
   - **Bloque** (1-8)
   - **Portal** (1-2)
   - **Planta** (Bajo, 1, 2, Ático)
   - **Letra** (A, B, C)
   - Tipo de Propietario
4. Acepta la política de privacidad
5. Haz clic en "Registrarse"

### 8️⃣ Confirmar Email (Importante)

1. Revisa la bandeja de entrada del email que registraste
2. Busca un email de Supabase
3. Haz clic en el link de confirmación
4. Una vez confirmado, ya puedes hacer login

### 9️⃣ Iniciar Sesión

1. Ve a `login.html`
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"
4. Serás redirigido al dashboard

---

## 🔍 Verificación en Supabase

### Ver usuarios registrados:
1. Ve a **Authentication** → **Users**
2. Deberías ver tu usuario con su email

### Ver datos de propietarios:
1. Ve a **Database** → **Table Editor** → **propietarios**
2. Deberías ver una fila con todos tus datos:
   - Nombre, email, bloque, portal, planta, letra, tipo_propietario

---

## 🐛 Solución de Problemas

### Error: "Invalid API credentials"
- Verifica que hayas copiado correctamente `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `supabase-config.js`

### Error: "Email already registered"
- Ese email ya está en uso. Usa otro o elimina el usuario desde Supabase → Authentication → Users

### Error: "Invalid login credentials"
- Email o contraseña incorrectos
- Si olvidaste tu contraseña, puedes resetearla desde Supabase

### No se guardan los datos del propietario
- Verifica que la tabla `propietarios` existe
- Verifica que las políticas RLS estén configuradas correctamente
- Revisa la consola del navegador (F12) para ver errores específicos

### No llega el email de confirmación
- Revisa spam/correo no deseado
- En Supabase Free tier, el email puede tardar unos minutos
- Puedes desactivar la confirmación de email temporalmente en Authentication → Providers → Email → "Enable email confirmations" (desmarcar)

---

## 📊 Estructura de la Base de Datos

### Tabla: `propietarios`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | UUID | Sí | ID único del registro |
| `user_id` | UUID | Sí | Referencia a auth.users |
| `nombre` | TEXT | Sí | Nombre completo |
| `email` | TEXT | Sí | Email (único) |
| `telefono` | TEXT | No | Teléfono de contacto |
| `bloque` | TEXT | Sí | Bloque (1-8) |
| `portal` | TEXT | Sí | Portal (1-2) |
| `planta` | TEXT | Sí | Planta (Bajo, 1, 2, Atico) |
| `letra` | TEXT | Sí | Letra (A, B, C) |
| `tipo_propietario` | TEXT | Sí | Tipo (Dueno, PropertyManager, Inquilino) |
| `created_at` | TIMESTAMP | Automático | Fecha de creación |
| `updated_at` | TIMESTAMP | Automático | Última actualización |

---

## 🔐 Seguridad

- ✅ Row Level Security (RLS) habilitado
- ✅ Usuarios solo pueden ver/editar sus propios datos
- ✅ Validación de campos en formulario y base de datos
- ✅ Contraseñas hasheadas automáticamente por Supabase Auth
- ✅ Confirmación de email opcional

---

## 📝 Próximos Pasos

1. **Personalizar emails**: Ve a Authentication → Email Templates para personalizar los emails de confirmación y recuperación de contraseña
2. **Agregar más funcionalidades**: 
   - Recuperar contraseña
   - Editar perfil
   - Cambiar contraseña
   - Ver otros propietarios del mismo bloque
3. **Desplegar**: Cuando estés listo, despliega tu aplicación en:
   - Netlify (recomendado para SPAs)
   - Vercel
   - GitHub Pages
   - Render

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa los logs en Supabase (Database → Logs)
3. Verifica que todos los campos obligatorios estén completos
4. Asegúrate de que el email esté confirmado

---

¡Tu aplicación L2H Community ya está integrada con Supabase! 🎉
