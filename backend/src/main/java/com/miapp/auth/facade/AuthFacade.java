package com.miapp.auth.facade;

import com.miapp.auth.datastruct.UserStoreSingleton;
import com.miapp.auth.domain.AuthResponse;
import com.miapp.auth.domain.User;
import com.miapp.auth.factory.AuthServiceFactory;
import com.miapp.auth.service.AuthService;
import org.springframework.stereotype.Component;

@Component
public class AuthFacade {
    private final AuthServiceFactory authServiceFactory;
    private final UserStoreSingleton userStore;

    public AuthFacade(AuthServiceFactory authServiceFactory) {
        this.authServiceFactory = authServiceFactory;
        this.userStore = UserStoreSingleton.getInstance();
    }

    public AuthResponse register(String email, String password, String username) throws Exception {
        AuthService authService = authServiceFactory.createAuthService();
        AuthResponse response = authService.register(email, password, username);
        
        User user = authService.getUserById(getUserIdFromToken(response.getToken()));
        if (user != null) {
            userStore.addUser(user);
        }
        
        return response;
    }

    public AuthResponse login(String email, String password) throws Exception {
        AuthService authService = authServiceFactory.createAuthService();
        AuthResponse response = authService.login(email, password);
        
        User user = authService.getUserById(getUserIdFromToken(response.getToken()));
        if (user != null) {
            userStore.addUser(user);
        }
        
        return response;
    }

    public User getCurrentUser(String token) {
        String userId = getUserIdFromToken(token);
        return userStore.getUser(userId);
    }

    private String getUserIdFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return null;
            
            String payload = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            com.fasterxml.jackson.databind.JsonNode node = mapper.readTree(payload);
            return node.get("sub").asText();
        } catch (Exception e) {
            return null;
        }
    }
}