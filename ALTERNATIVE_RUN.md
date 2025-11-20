# Spring Boot JAR Runner

Como no tenemos Maven instalado, voy a crear una guía para ejecutar el proyecto de forma alternativa.

## Opción 1: Usar Spring Boot CLI (recomendado)
1. Descarga Spring Boot CLI desde: https://spring.io/projects/spring-boot#learn
2. Instálalo y ejecuta:
   ```bash
   spring run src/main/java/com/miapp/Application.java
   ```

## Opción 2: Compilar manualmente (avanzado)
1. Descarga todas las dependencias JAR de Spring Boot
2. Compila con javac incluyendo el classpath
3. Ejecuta con java -cp

## Opción 3: Usar Docker (si está disponible)
```dockerfile
FROM openjdk:17-jdk-slim
COPY . /app
WORKDIR /app
RUN ./mvnw clean install
CMD ["java", "-jar", "target/entrepreneur-platform-0.0.1-SNAPSHOT.jar"]
```

## Opción 4: Ejecutar con Node.js temporalmente
Mientras tanto, puedo crear un servidor Node.js simple que simule la API para que puedas probar el frontend.