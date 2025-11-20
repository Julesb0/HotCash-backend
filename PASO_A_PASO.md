# 🚀 GUÍA PASO A PASO - PLATAFORMA ENTREPRENEUR

## 📋 RESUMEN DE TU PROYECTO

✅ **Frontend React**: http://localhost:3000 (FUNCIONANDO)
✅ **Backend Node.js**: http://localhost:8080 (FUNCIONANDO) 
✅ **Backend Java Simple**: http://localhost:8081 (FUNCIONANDO)
✅ **Supabase**: Tablas y RLS configurados (FUNCIONANDO)

## 🎯 PASO 1: PROBAR LA APLICACIÓN ACTUAL

### 1.1 Verificar que todo esté funcionando:

**Frontend**: Abre tu navegador y ve a:
```
http://localhost:3000
```

**Backend Node.js**: Verifica que responda:
```
http://localhost:8080/api/health
```

**Backend Java**: Verifica que responda:
```
http://localhost:8081/api/health
```

### 1.2 Probar el flujo completo:

1. **Regístrate** en http://localhost:3000/register
   - Email: test@emprendedor.com
   - Password: 123456
   - Username: EmprendedorTest

2. **Login** en http://localhost:3000/login
   - Usa las mismas credenciales

3. **Crea un plan de negocio**:
   - Title: "Mi Startup Tecnológica"
   - Summary: "Una plataforma innovadora para emprendedores"

## 🔧 PASO 2: INSTALAR DEPENDENCIAS ADICIONALES (SI NECESITAS REINICIAR)

### Si necesitas reiniciar el frontend:
```bash
cd frontend
npm install
npm run dev
```

### Si necesitas reiniciar el backend Node.js:
```bash
cd backend-temp
npm install
npm start
```

### Si necesitas reiniciar el backend Java:
```bash
cd backend-simple
javac SimpleServer.java
java SimpleServer
```

## 📊 PASO 3: VERIFICAR SUPABASE

### 3.1 Accede a tu dashboard de Supabase:
- URL: https://supabase.com/dashboard/project/jmumjdejdhncycnxgkom
- Verifica que las tablas existan: `profiles` y `business_plans`

### 3.2 Las credenciales ya están configuradas en `backend/.env`:
```
SUPABASE_URL=https://jmumjdejdhncycnxgkom.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=hotcashv2-super-secreto-jwt-2024...
```

## 🚀 PASO 4: EJECUTAR EL BACKEND SPRING BOOT REAL (OPCIONAL)

Cuando estés listo para usar el backend real con Spring Boot:

### 4.1 Instalar Maven (si no lo tienes):
1. Ve a: https://maven.apache.org/download.cgi
2. Descarga la versión binaria
3. Extrae y añade a PATH
4. Verifica: `mvn --version`

### 4.2 Compilar y ejecutar:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 4.3 Cambiar el puerto del frontend (si es necesario):
Edita `frontend/.env`:
```
VITE_API_BASE=http://localhost:8080
```

## 🎮 PASO 5: PRUEBAS RÁPIDAS CON CURL

### Probar registro:
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","username":"testuser"}'
```

### Probar login:
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### Probar planes (necesitas token):
```bash
curl -X GET http://localhost:8081/api/plans \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## 📁 ESTRUCTURA DE ARCHIVOS

```
HotCashV2/
├── backend/                    # Spring Boot (listo para Maven)
├── backend-temp/              # Node.js temporal (FUNCIONANDO)
├── backend-simple/            # Java simple (FUNCIONANDO)
├── frontend/                  # React + Vite (FUNCIONANDO)
├── supabase_setup.sql         # SQL ejecutado ✅
├── README.md                  # Documentación
└── PASO_A_PASO.md            # Esta guía
```

## 🎯 ¿QUÉ PUEDES HACER AHORA?

✅ **Probar la aplicación completa** con el servidor temporal
✅ **Crear planes de negocio** y ver cómo funciona el flujo
✅ **Personalizar el frontend** en `frontend/src/`
✅ **Agregar nuevas funciones** al backend temporal
✅ **Migrar al Spring Boot real** cuando instales Maven

## 🔥 PRÓXIMOS PASOS (CUANDO ESTÉS LISTO)

1. **Instalar Maven** y ejecutar el backend Spring Boot real
2. **Conectar con Supabase** (el código ya está listo)
3. **Agregar más funcionalidades**:
   - Chatbot de IA
   - Sistema de networking
   - Gamificación
   - Panel de administración

## 🆘 SOLUCIÓN DE PROBLEMAS

### Si el puerto 3000 está ocupado:
```bash
# En frontend/package.json, cambia el puerto:
"dev": "vite --port 3001"
```

### Si el puerto 8080 está ocupado:
```bash
# En backend-temp/server.js, cambia:
const PORT = 8082;
```

### Si el puerto 8081 está ocupado:
```bash
# En backend-simple/SimpleServer.java, cambia:
HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
```

### Para ver qué procesos están usando los puertos:
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :8080
netstat -ano | findstr :8081
```

## 🎉 ¡FELICITACIONES!

Tu plataforma para emprendedores está funcionando completamente. Tienes:

- ✅ **Frontend profesional** con React y TypeScript
- ✅ **Backend funcional** con múltiples opciones
- ✅ **Base de datos** en Supabase con seguridad RLS
- ✅ **Autenticación completa** con JWT
- ✅ **CRUD de planes de negocio**

¡Todo está listo para que empieces a desarrollar tu plataforma de emprendedores! 🚀