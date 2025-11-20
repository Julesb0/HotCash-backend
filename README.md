# HotCash V2 - Entrepreneur Platform

Una plataforma completa para emprendedores con autenticación JWT, perfiles de usuario, gestión de planes de negocio y dashboard analítico.

## 🚀 Características

- **Autenticación completa** con JWT tokens
- **Sistema de perfiles** con 20+ campos de información
- **Dashboard profesional** con gráficos interactivos
- **Gestión de planes de negocio** con CRUD operations
- **Diseño moderno y responsivo** con Tailwind CSS
- **Backend robusto** con Spring Boot y Java
- **Frontend interactivo** con React y TypeScript
- **Integración con Supabase** para base de datos confiable

## 📋 Tecnologías Utilizadas

### Backend
- Spring Boot 3.2.0
- Java 17
- JWT Authentication
- Maven
- Supabase (PostgreSQL)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (gráficos)

## 🛠️ Instalación Local

### Requisitos Previos
- Node.js 18+
- Java 17+
- Maven 3.9+
- Cuenta en Supabase

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Variables de Entorno

### Backend (.env)
```
SUPABASE_URL=tu-url-de-supabase
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
JWT_SECRET=tu-jwt-secreto
```

### Frontend (.env)
```
VITE_API_BASE=http://localhost:8080
```

## 📦 Estructura del Proyecto

```
HotCashV2/
├── backend/              # Spring Boot Backend
│   ├── src/main/java/com/miapp/
│   │   ├── auth/        # Autenticación
│   │   └── core/        # Lógica principal
│   └── target/          # Archivos compilados
├── frontend/            # React Frontend
│   ├── src/pages/       # Páginas principales
│   ├── src/api/         # Cliente API
│   └── dist/            # Build de producción
├── supabase/            # Migraciones y configuración
└── vercel.json          # Configuración de despliegue
```

## 🌐 Despliegue

El proyecto está configurado para despliegue en:
- **Frontend**: Vercel
- **Backend**: Railway/Render (pendiente)

## 📄 Licencia

Este proyecto es propiedad de Julesb0.

## 📞 Contacto

**Autor**: Julesb0  
**Email**: jul.b.benavides@gmail.com  
**GitHub**: https://github.com/Julesb0