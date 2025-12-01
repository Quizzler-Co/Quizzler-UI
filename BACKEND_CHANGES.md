# Backend Changes for Cloudflare Tunnel (Frontend Only)

This document outlines the changes needed in your **Spring Boot backend** when only the **frontend** is exposed via Cloudflare Tunnel.

## Overview

**Important:** Only the frontend is exposed via Cloudflare Tunnel. The backend stays on `localhost:8086` and is **NOT directly accessible** from the internet.

However, Cloudflare Tunnel can proxy `/api/*` requests to your localhost backend, so the frontend can still make API calls. The backend doesn't need to know about Cloudflare Tunnel - it just needs to accept requests from localhost.

## Required Changes

### 1. CORS Configuration (Most Important)

#### Option A: Allow Cloudflare Tunnel Domain (Recommended)

Even though the backend is on localhost, requests come through Cloudflare Tunnel. You need to configure CORS to allow your Cloudflare Tunnel domain:

**Spring Boot Configuration (`application.properties` or `application.yml`):**

```properties
# Development - allow Vite dev server
spring.web.cors.allowed-origins=http://localhost:5173

# Production - allow Cloudflare Tunnel domain
# Replace with your actual Cloudflare Tunnel domain
spring.web.cors.allowed-origins=https://your-app.trycloudflare.com,https://your-app.example.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

**Or use a CORS Configuration Class:**

```java
@Configuration
public class CorsConfig {
    
    @Value("${cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(allowedOrigins.split(",")) // Dev + Cloudflare Tunnel domain
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

**Configuration:**
- **Development:** Allow `http://localhost:5173` (Vite dev server)
- **Production:** Allow your Cloudflare Tunnel domain (e.g., `https://your-app.trycloudflare.com`)

#### Option B: Environment-Based CORS (Better Approach)

Make CORS conditional based on environment:

```java
@Configuration
public class CorsConfig {
    
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                if ("dev".equals(activeProfile)) {
                    // Development - allow Vite dev server
                    registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
                } else {
                    // Production - allow Cloudflare Tunnel domain
                    // Replace with your actual Cloudflare Tunnel domain
                    registry.addMapping("/api/**")
                        .allowedOrigins("https://your-app.trycloudflare.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
                }
            }
        };
    }
}
```

### 2. Server Configuration

**Keep backend on localhost only!** Your backend should run on:

```properties
server.port=8086
server.address=localhost  # Keep on localhost - NOT 0.0.0.0
```

**Important:** The backend should **NOT** be publicly accessible. Cloudflare Tunnel running on your machine will proxy `/api/*` requests to `http://localhost:8086`. The backend itself is never directly exposed to the internet.

### 3. API Endpoints

**No changes needed!** All your existing endpoints will work as-is:

- `/api/v1/auth/*`
- `/api/v1/quiz/*`
- `/api/v1/judge/*`
- `/api/v1/participation/*`
- `/api/v1/leaderboard/*`

### 4. Security Considerations

#### Trust Proxy Headers (Important!)

Cloudflare Tunnel adds headers like `X-Forwarded-For`, `X-Forwarded-Proto`, etc. If your backend needs to know the original client IP or protocol, configure trust:

```properties
# Trust Cloudflare Tunnel proxy
server.forward-headers-strategy=framework
```

Or in code:

```java
@Configuration
public class ProxyConfig {
    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> 
            forwardedHeaderCustomizer() {
        return factory -> factory.setForwardHeadersStrategy(
            ForwardHeadersStrategy.FRAMEWORK
        );
    }
}
```

#### HTTPS/SSL

- Cloudflare Tunnel handles SSL termination
- Your backend can continue using HTTP (localhost:8086)
- Cloudflare encrypts traffic between client and tunnel

### 5. Environment-Specific Configuration

Create separate configurations for dev and prod:

**`application-dev.properties`:**
```properties
# Development - CORS enabled
spring.web.cors.allowed-origins=http://localhost:5173
```

**`application-prod.properties`:**
```properties
# Production - No CORS needed (Cloudflare Tunnel)
# CORS disabled or not configured
```

## Cloudflare Tunnel Configuration

Since only the frontend is exposed, your Cloudflare Tunnel config should be:

```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  # Frontend static files (after npm run build)
  - hostname: your-app.example.com
    service: file_server: /path/to/dist
  
  # Proxy API requests to localhost backend
  - path: /api/*
    service: http://localhost:8086
  
  # Catch-all
  - service: http_status:404
```

**Key Points:**
- Frontend is served as static files
- `/api/*` requests are proxied to `localhost:8086`
- Backend is never directly exposed - only through the tunnel

## Summary of Changes

### ✅ Required Changes:
1. **CORS Configuration** - Allow your Cloudflare Tunnel domain (e.g., `https://your-app.trycloudflare.com`)
2. **Keep backend on localhost** - Don't expose it publicly

### ❌ NOT Required:
- ❌ Change server port (keep 8086)
- ❌ Change API endpoints
- ❌ Add Cloudflare-specific dependencies
- ❌ Change authentication/authorization logic
- ❌ Modify database connections
- ❌ Change logging configuration
- ❌ Expose backend publicly (keep on localhost)

## Testing Checklist

### Local Development:
- [ ] Backend runs on `http://localhost:8086`
- [ ] CORS allows `http://localhost:5173`
- [ ] Frontend can make API calls via Vite proxy
- [ ] All endpoints work correctly

### Production (Cloudflare Tunnel):
- [ ] Backend runs on `http://localhost:8086` (NOT publicly accessible)
- [ ] Cloudflare Tunnel proxies `/api/*` to `localhost:8086`
- [ ] CORS allows your Cloudflare Tunnel domain
- [ ] All endpoints accessible via tunnel domain
- [ ] Authentication/authorization works
- [ ] Backend is NOT directly accessible from internet (security)

## Example: Complete CORS Configuration

Here's a complete example that works for both dev and prod:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(allowedOrigins.split(","))
            .allowedMethods("*")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

**application-dev.properties:**
```properties
cors.allowed-origins=http://localhost:5173
```

**application-prod.properties:**
```properties
# Replace with your actual Cloudflare Tunnel domain
cors.allowed-origins=https://your-app.trycloudflare.com
```

## Troubleshooting

### CORS errors in production:
- **Problem:** CORS errors when accessing via Cloudflare Tunnel
- **Solution:** Add your Cloudflare Tunnel domain to `allowedOrigins` (e.g., `https://your-app.trycloudflare.com`)

### Backend not receiving requests:
- **Problem:** Requests not reaching backend
- **Solution:** Check Cloudflare Tunnel configuration - ensure `/api/*` routes to `http://localhost:8086`

### Client IP shows as localhost:
- **Problem:** Need real client IP for logging/security
- **Solution:** Enable `server.forward-headers-strategy=framework`

### Authentication not working:
- **Problem:** Cookies/tokens not being sent
- **Solution:** Ensure `allowCredentials(true)` in dev CORS config, and check cookie domain settings

## Next Steps

1. Update CORS configuration in your Spring Boot backend
2. Test locally with Vite dev server
3. Configure Cloudflare Tunnel to proxy `/api/*` to `http://localhost:8086`
4. Test production deployment
5. Monitor for any CORS or proxy-related issues

