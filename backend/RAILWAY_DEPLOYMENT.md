# Railway Deployment Guide for Entrepreneur Platform Backend

## Prerequisites
- Railway CLI installed: `npm install -g @railway/cli`
- Railway account and project created
- Environment variables configured in Railway dashboard

## Environment Variables Required

Configure these in your Railway project dashboard:

```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_at_least_32_characters_long

# Application Configuration (optional)
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

## Deployment Steps

### 1. Login to Railway
```bash
railway login
```

### 2. Link your project
```bash
railway link
```

### 3. Deploy to Railway
```bash
railway up
```

### 4. Check deployment status
```bash
railway status
```

### 5. View logs
```bash
railway logs
```

## Build Configuration

The `railway.toml` file configures:
- **Builder**: Maven for Java projects
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/entrepreneur-platform-0.0.1-SNAPSHOT.jar`
- **Restart Policy**: Automatic restart on failure with max 3 retries

## API Endpoints

Once deployed, your backend will be available at:
- **Base URL**: `https://your-project.railway.app`
- **Health Check**: `GET /api/health`
- **Authentication**: `POST /api/auth/login`, `POST /api/auth/register`
- **Profile**: `GET /api/profile/me`, `PUT /api/profile/me`
- **Business Plans**: `GET /api/business-plans`, `POST /api/business-plans`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Maven dependencies in `pom.xml`
   - Ensure Java 17 compatibility
   - Verify environment variables are set

2. **Runtime Errors**
   - Check application logs: `railway logs`
   - Verify Supabase connection
   - Ensure JWT secret is properly configured

3. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check network connectivity
   - Ensure RLS policies are configured

### Environment Variable Validation

Test your configuration locally first:
```bash
# Set environment variables
export SUPABASE_URL=your_supabase_url
export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
export JWT_SECRET=your_jwt_secret

# Run locally
mvn spring-boot:run
```

## Security Considerations

1. **Never commit sensitive data** to repository
2. **Use Railway environment variables** for all secrets
3. **Configure CORS** properly for your frontend domain
4. **Enable RLS** on Supabase tables
5. **Use HTTPS** (Railway provides SSL automatically)

## Monitoring

- **Railway Dashboard**: Monitor resource usage and logs
- **Application Health**: Implement health check endpoints
- **Error Tracking**: Consider integrating Sentry or similar
- **Performance**: Monitor response times and database queries

## Scaling

Railway automatically scales based on usage:
- **CPU**: Scales with request load
- **Memory**: Configure in Railway dashboard
- **Database**: Supabase handles scaling separately

## Backup Strategy

- **Database**: Use Supabase backup features
- **Application Code**: Version control with Git
- **Configuration**: Document in this deployment guide