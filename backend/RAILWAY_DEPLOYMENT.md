# Despliegue en Railway - Backend

## Configuración de Variables de Entorno

En Railway, configura las siguientes variables de entorno:

### Variables Obligatorias

```bash
# Supabase
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_de_supabase

# JWT
JWT_SECRET=tu_secreto_jwt_seguro

# CORS (opcional, tiene valores por defecto)
CORS_ORIGINS=https://tu-dominio-frontend.vercel.app,https://otro-dominio.com
```

### Variables Opcionales

```bash
# Puerto (Railway lo asigna automáticamente)
PORT=8080

# Credenciales de admin (por defecto: admin/admin)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_contraseña_segura
```

## Pasos de Despliegue

1. **Conectar repositorio a Railway**:
   - Ve a railway.app
   - Crea un nuevo proyecto
   - Conecta tu repositorio de GitHub
   - Selecciona el directorio `backend`

2. **Configurar variables de entorno**:
   - Ve a Settings > Variables
   - Añade todas las variables obligatorias
   - Railway reiniciará automáticamente

3. **Verificar despliegue**:
   - La URL del backend aparecerá en el dashboard
   - El endpoint `/actuator/health` debe responder con estado "UP"

4. **Probar endpoints**:
   - `GET https://tu-backend.railway.app/api/profile/me`
   - `PUT https://tu-backend.railway.app/api/profile/me`

## Solución de Problemas

### Health Check Fallido
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Railway dashboard
- Asegúrate de que Supabase esté accesible

### CORS Errors
- Actualiza `CORS_ORIGINS` con el dominio correcto de tu frontend
- Verifica que el frontend esté usando el URL correcto del backend

### JWT Errors
- Asegúrate de que `JWT_SECRET` sea el mismo en frontend y backend
- Verifica que el token se esté enviando correctamente en los headers

## Comandos Útiles

```bash
# Ver logs
railway logs

# Reiniciar servicio
railway restart

# Variables actuales
railway variables
```