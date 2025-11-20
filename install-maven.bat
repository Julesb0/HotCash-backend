@echo off
echo Instalando Maven 3.9.5...

:: Crear directorio para Maven
mkdir C:\maven

:: Descargar Maven (usando PowerShell)
powershell -Command "Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.zip' -OutFile 'maven.zip'"

:: Extraer Maven
powershell -Command "Expand-Archive -Path 'maven.zip' -DestinationPath 'C:\maven' -Force"

:: Configurar variables de entorno
setx PATH "%PATH%;C:\maven\apache-maven-3.9.5\bin" /M

echo Maven instalado exitosamente!
echo Por favor, reinicia la terminal y ejecuta: mvn --version
echo.
echo O simplemente ejecuta el backend con: C:\maven\apache-maven-3.9.5\bin\mvn spring-boot:run
pause