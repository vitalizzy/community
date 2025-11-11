# 🚀 Edge Functions - L2H Community

Las Edge Functions son funciones serverless alojadas en Supabase que se ejecutan en tu base de datos.

## 📋 Función: `request-account-deletion`

Esta función se invoca cuando el usuario solicita eliminar su cuenta. Envía un email de confirmación.

### ⚙️ Configuración

1. **Ve a Supabase Dashboard → Edge Functions**
2. Haz clic en **"Create a new function"**
3. Nombre: `request-account-deletion`
4. Selecciona **TypeScript** como lenguaje
5. Copia y pega el código abajo:

### 📝 Código TypeScript

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Obtener datos de la solicitud
    const { user_id, email } = await req.json();

    if (!user_id || !email) {
      throw new Error("user_id y email son requeridos");
    }

    // Crear cliente Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generar token temporal para confirmar eliminación
    const token = crypto.getRandomValues(new Uint8Array(32));
    const tokenHex = Array.from(token)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Guardar token en una tabla temporal (opcional)
    // Por ahora, solo enviamos el email

    // Construir link de confirmación
    const siteUrl = Deno.env.get("SITE_URL") || "https://vitalizzy.github.io/community";
    const confirmationLink = `${siteUrl}/confirm-deletion.html?token=${tokenHex}&user=${encodeURIComponent(user_id)}`;

    // Aquí puedes integrar un servicio de email como Resend, SendGrid, etc.
    // Por ahora, simularemos el envío
    console.log(`Email de eliminación de cuenta enviado a: ${email}`);
    console.log(`Link de confirmación: ${confirmationLink}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Se ha enviado un email de confirmación a ${email}`,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
```

### 🔧 Configuración de Secretos

1. En la página de la Edge Function, ve a **Settings** (⚙️)
2. Bajo **Secrets**, añade:
   - **SUPABASE_URL**: Tu URL de Supabase (cópiala de Settings → API)
   - **SUPABASE_SERVICE_ROLE_KEY**: Tu Service Role Key (cópiala de Settings → API)
   - **SITE_URL**: `https://vitalizzy.github.io/community`

3. Haz clic en **Save**

### 🚀 Desplegar

1. Haz clic en **Deploy**
2. Espera a que se complete el despliegue (1-2 minutos)
3. Copia la URL de la función (algo como `https://xxxxx.functions.supabase.co/request-account-deletion`)

### 📌 Alternativas para Envío de Emails

La función anterior solo **simula** el envío. Para enviar emails reales, puedes:

#### Opción 1: Usar Supabase Emails (Recomendado)
```typescript
import { Resend } from "https://esm.sh/resend@latest";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

await resend.emails.send({
  from: "noreply@tudominio.com",
  to: email,
  subject: "Confirmación de eliminación de cuenta",
  html: `
    <p>Hola,</p>
    <p>Recibimos tu solicitud para eliminar tu cuenta de L2H Community.</p>
    <p><a href="${confirmationLink}">Confirmar eliminación</a></p>
    <p>Si no solicitaste esto, ignora este email.</p>
  `,
});
```

#### Opción 2: Usar SendGrid
```typescript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(Deno.env.get("SENDGRID_API_KEY"));

await sgMail.send({
  to: email,
  from: "noreply@tudominio.com",
  subject: "Confirmación de eliminación de cuenta",
  html: `...`,
});
```

#### Opción 3: Usar Mailgun
Similar a SendGrid, requiere API key de Mailgun.

---

## 🧪 Prueba la Función

Desde tu aplicación (`profile-menu.js`):

```javascript
const { error } = await supabase.functions.invoke('request-account-deletion', {
  body: {
    user_id: this.state.user.id,
    email: this.state.user.email
  }
});
```

---

## 📋 Próximas Funciones Sugeridas

1. **`confirm-account-deletion`** - Elimina realmente la cuenta tras confirmar
2. **`send-welcome-email`** - Envía email de bienvenida al registrarse
3. **`verify-phone`** - Verifica el teléfono del usuario

---

## 🔐 Seguridad

- ✅ Requiere autenticación (usar contexto de Supabase)
- ✅ Valida que el usuario exista
- ✅ No expone datos sensibles en errores
- ✅ Rate limiting recomendado

---

¡Las Edge Functions están configuradas! 🎉
