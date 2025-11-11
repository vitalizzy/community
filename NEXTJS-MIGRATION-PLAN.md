# 🚀 Migración Next.js - Plan Completo

**Fecha Inicio:** Noviembre 11, 2025
**Estado:** En Progreso
**Duración Estimada:** 2-3 semanas

---

## 📊 ALCANCE DEL PROYECTO

### Páginas Existentes (HTML → React Components)
```
1. index.html → app/page.tsx (Landing)
2. login.html → app/(auth)/login/page.tsx
3. register.html → app/(auth)/register/page.tsx
4. forgot-password.html → app/(auth)/forgot-password/page.tsx
5. reset-password.html → app/(auth)/reset-password/page.tsx
6. change-password.html → app/(auth)/change-password/page.tsx
7. dashboard.html → app/(dashboard)/page.tsx
8. onboarding-properties.html → app/(dashboard)/onboarding/page.tsx
9. privacy-policy.html → app/privacy/page.tsx
```

### Componentes Reutilizables
```
- AuthLayout (Diseño para auth pages)
- DashboardLayout (Diseño para dashboard)
- ThemeProvider (Tema claro/oscuro)
- FormComponents (Inputs, validación)
- AlertComponent (Notificaciones)
- LoadingSpinner
- NavBar
```

### Funcionalidades
```
- ✅ Autenticación Supabase
- ✅ Sesión del usuario
- ✅ Protección de rutas
- ✅ Propietarios (CRUD)
- ✅ Propiedades (CRUD)
- ✅ Dashboard con datos
- ✅ Onboarding multipasos
- ✅ Cambio de contraseña
- ✅ Recuperación de contraseña
- ✅ Internacionalización (i18n)
- ✅ Temas (light/dark)
```

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
community-nextjs/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   ├── change-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx (Dashboard)
│   │   ├── onboarding/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── layout.tsx (Root layout)
│   └── page.tsx (Landing)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── PasswordRecoveryForm.tsx
│   ├── dashboard/
│   │   ├── DashboardContent.tsx
│   │   ├── UserInfo.tsx
│   │   └── PropertyCard.tsx
│   ├── onboarding/
│   │   ├── PropertyForm.tsx
│   │   └── OnboardingStep.tsx
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── AlertComponent.tsx
│   └── layout/
│       ├── AuthLayout.tsx
│       └── DashboardLayout.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── queries.ts
│   ├── auth/
│   │   └── middleware.ts
│   ├── utils.ts
│   └── types.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── usePropietario.ts
│   └── useTheme.ts
├── api/
│   ├── auth/
│   │   ├── register/route.ts
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── propietario/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── properties/
│       ├── route.ts
│       └── [id]/route.ts
├── styles/
│   ├── globals.css
│   ├── auth.module.css
│   └── dashboard.module.css
├── public/
│   ├── favicon.svg
│   └── images/
├── .env.local (Example)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## 🔄 FASES DE IMPLEMENTACIÓN

### Fase 1: Setup Base (Esta semana)
- [ ] Crear proyecto Next.js con estructura base
- [ ] Configurar Supabase client y server
- [ ] Setup Tailwind CSS
- [ ] Crear layouts base (Auth, Dashboard)
- [ ] Implementar autenticación

### Fase 2: Componentes Auth (Semana 2)
- [ ] Login page
- [ ] Register page
- [ ] Forgot password page
- [ ] Reset password page
- [ ] Change password page
- [ ] Middleware de protección

### Fase 3: Dashboard (Semana 2-3)
- [ ] Dashboard layout
- [ ] User data display
- [ ] Propiedades CRUD
- [ ] Onboarding multipasos

### Fase 4: Refinements (Semana 3)
- [ ] Temas (light/dark)
- [ ] Internacionalización
- [ ] Optimizaciones
- [ ] Testing
- [ ] Deploy

---

## 📦 DEPENDENCIAS CLAVE

```json
{
  "react": "^18.3.1",
  "next": "^15.0.0",
  "@supabase/supabase-js": "^2.43.0",
  "@supabase/auth-helpers-nextjs": "^0.9.0",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.3",
  "clsx": "^2.1.1"
}
```

---

## 🔐 MAPEO: HTML → Next.js

| HTML File | Next.js Component | Type |
|-----------|------------------|------|
| index.html | app/page.tsx | Page |
| login.html | app/(auth)/login/page.tsx | Page |
| register.html | app/(auth)/register/page.tsx | Page |
| dashboard.html | app/(dashboard)/page.tsx | Page |
| dashboard-auth.js | hooks/useAuth.ts + lib/auth/middleware.ts | Logic |
| register.js | components/auth/RegisterForm.tsx + api/auth/register/route.ts | Logic |
| login.js | components/auth/LoginForm.tsx | Logic |
| supabase-config.js | lib/supabase/client.ts + lib/supabase/server.ts | Config |
| theme.js | components/common/ThemeToggle.tsx + hooks/useTheme.ts | Logic |
| translations.js | i18n configuration | Config |

---

## 🎯 BENEFICIOS DE NEXT.JS

✅ **Server-Side Rendering (SSR)** - Mejor SEO
✅ **Static Generation** - Performance
✅ **API Routes** - Backend integrado
✅ **Built-in middleware** - Protección de rutas
✅ **TypeScript ready** - Type safety
✅ **Image optimization** - Mejor rendimiento
✅ **Production ready** - Deploy fácil a Vercel

---

## 🚀 DEPLOYMENT

### Local Development
```bash
npm install
npm run dev
# http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Deploy a Vercel
```bash
vercel deploy
```

---

## 📋 CHECKLIST FINAL

- [ ] Proyecto creado y estructurado
- [ ] Supabase integrado
- [ ] Auth funcional
- [ ] Todas las páginas migradas
- [ ] Componentes reutilizables
- [ ] TypeScript completamente tipado
- [ ] Tailwind CSS configurado
- [ ] Middleware de protección
- [ ] API routes funcionales
- [ ] Testing básico
- [ ] Documentación actualizada
- [ ] Deploy en Vercel
- [ ] Migración de datos completada
- [ ] HTML legacy archivado
- [ ] ✅ PRODUCTION READY

---

**Next Step:** Crear estructura base del proyecto
