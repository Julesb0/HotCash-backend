import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servidor HTTP simple para probar el frontend mientras resolvemos Maven
 * Este servidor simula la API de Spring Boot
 */
public class SimpleServer {
    
    // Almacenamiento en memoria
    private static Map<String, User> users = new ConcurrentHashMap<>();
    private static Map<String, BusinessPlan> businessPlans = new ConcurrentHashMap<>();
    private static Map<String, AuthSession> sessions = new ConcurrentHashMap<>();
    
    public static void main(String[] args) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0);
            
            // Configurar CORS
            server.createContext("/api", exchange -> {
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
                
                if ("OPTIONS".equals(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(200, -1);
                    return;
                }
            });
            
            // Endpoints de autenticación
            server.createContext("/api/auth/register", new RegisterHandler());
            server.createContext("/api/auth/login", new LoginHandler());
            server.createContext("/api/plans", new BusinessPlansHandler());
            server.createContext("/api/health", new HealthHandler());
            
            server.setExecutor(null);
            server.start();
            
            System.out.println("🚀 Servidor Simple ejecutándose en http://localhost:8081");
            System.out.println("📋 Este servidor simula el backend Spring Boot");
            System.out.println("🔑 Usa cualquier email/password para registrarte");
            
        } catch (IOException e) {
            System.err.println("Error al iniciar el servidor: " + e.getMessage());
        }
    }
    
    // Handlers
    static class RegisterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> data = parseJson(body);
                
                String email = data.get("email");
                String password = data.get("password");
                String username = data.get("username");
                
                if (email == null || password == null || username == null) {
                    sendResponse(exchange, 400, "{\"error\":\"Missing required fields\"}");
                    return;
                }
                
                // Crear usuario
                String userId = UUID.randomUUID().toString();
                User user = new User(userId, email, username, "ENTREPRENEUR");
                users.put(userId, user);
                
                // Crear sesión
                String token = UUID.randomUUID().toString();
                sessions.put(token, new AuthSession(userId, username));
                
                String response = String.format("{\"token\":\"%s\",\"username\":\"%s\"}", token, username);
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        }
    }
    
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> data = parseJson(body);
                
                String email = data.get("email");
                String password = data.get("password");
                
                if (email == null || password == null) {
                    sendResponse(exchange, 400, "{\"error\":\"Missing email or password\"}");
                    return;
                }
                
                // Buscar usuario (simulado - en producción verificar password hash)
                User user = users.values().stream()
                    .filter(u -> email.equals(u.email))
                    .findFirst()
                    .orElse(null);
                
                if (user == null) {
                    // Crear usuario temporal si no existe
                    String userId = UUID.randomUUID().toString();
                    user = new User(userId, email, email.split("@")[0], "ENTREPRENEUR");
                    users.put(userId, user);
                }
                
                // Crear sesión
                String token = UUID.randomUUID().toString();
                sessions.put(token, new AuthSession(user.id, user.username));
                
                String response = String.format("{\"token\":\"%s\",\"username\":\"%s\"}", token, user.username);
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        }
    }
    
    static class BusinessPlansHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String authHeader = exchange.getRequestHeaders().getFirst("Authorization");
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                sendResponse(exchange, 401, "{\"error\":\"No token provided\"}");
                return;
            }
            
            String token = authHeader.substring(7);
            AuthSession session = sessions.get(token);
            
            if (session == null) {
                sendResponse(exchange, 401, "{\"error\":\"Invalid token\"}");
                return;
            }
            
            if ("GET".equals(method)) {
                // Obtener planes del usuario
                List<BusinessPlan> userPlans = businessPlans.values().stream()
                    .filter(plan -> session.userId.equals(plan.userId))
                    .collect(ArrayList::new, (list, plan) -> list.add(plan), ArrayList::addAll);
                
                StringBuilder response = new StringBuilder("[");
                for (int i = 0; i < userPlans.size(); i++) {
                    BusinessPlan plan = userPlans.get(i);
                    if (i > 0) response.append(",");
                    response.append(String.format(
                        "{\"id\":\"%s\",\"title\":\"%s\",\"summary\":\"%s\",\"createdAt\":\"%s\",\"updatedAt\":\"%s\"}",
                        plan.id, plan.title, plan.summary, plan.createdAt, plan.updatedAt
                    ));
                }
                response.append("]");
                sendResponse(exchange, 200, response.toString());
                
            } else if ("POST".equals(method)) {
                // Crear nuevo plan
                String body = readRequestBody(exchange);
                Map<String, String> data = parseJson(body);
                
                String title = data.get("title");
                String summary = data.get("summary");
                
                if (title == null) {
                    sendResponse(exchange, 400, "{\"error\":\"Title is required\"}");
                    return;
                }
                
                String planId = UUID.randomUUID().toString();
                String now = new Date().toInstant().toString();
                BusinessPlan plan = new BusinessPlan(planId, session.userId, title, summary != null ? summary : "", now, now);
                businessPlans.put(planId, plan);
                
                String response = String.format(
                    "{\"id\":\"%s\",\"title\":\"%s\",\"summary\":\"%s\",\"createdAt\":\"%s\",\"updatedAt\":\"%s\"}",
                    plan.id, plan.title, plan.summary, plan.createdAt, plan.updatedAt
                );
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        }
    }
    
    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "{\"status\":\"OK\",\"timestamp\":\"" + new Date().toInstant().toString() + "\"}";
            sendResponse(exchange, 200, response);
        }
    }
    
    // Utilidades
    private static String readRequestBody(HttpExchange exchange) throws IOException {
        java.util.Scanner scanner = new java.util.Scanner(exchange.getRequestBody()).useDelimiter("\\A");
        return scanner.hasNext() ? scanner.next() : "";
    }
    
    private static Map<String, String> parseJson(String json) {
        Map<String, String> result = new HashMap<>();
        json = json.trim().replace("{", "").replace("}", "").replace("\"", "");
        String[] pairs = json.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                result.put(keyValue[0].trim(), keyValue[1].trim());
            }
        }
        return result;
    }
    
    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
    
    // Clases de modelo
    static class User {
        String id, email, username, role;
        
        User(String id, String email, String username, String role) {
            this.id = id;
            this.email = email;
            this.username = username;
            this.role = role;
        }
    }
    
    static class BusinessPlan {
        String id, userId, title, summary, createdAt, updatedAt;
        
        BusinessPlan(String id, String userId, String title, String summary, String createdAt, String updatedAt) {
            this.id = id;
            this.userId = userId;
            this.title = title;
            this.summary = summary;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
    
    static class AuthSession {
        String userId, username;
        
        AuthSession(String userId, String username) {
            this.userId = userId;
            this.username = username;
        }
    }
}