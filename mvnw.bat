@echo off
echo === MAVEN WRAPPER PARA ENTREPRENEUR PLATFORM ===
echo.

:: Verificar si Maven está instalado
where mvn >nul 2>nul
if %errorlevel% == 0 (
    echo ✅ Maven ya está instalado
    mvn --version
    goto :maven_ready
)

:: Intentar usar Maven wrapper
if exist "mvnw" (
    echo ✅ Usando Maven wrapper
    call mvnw %*
    goto :end
)

:: Si no hay Maven, crear un wrapper simple
echo ❌ Maven no encontrado. Creando wrapper temporal...

:: Crear un batch que simule Maven básico
echo @echo off > mvnw.bat
echo echo Simulando Maven... >> mvnw.bat
echo echo Por favor instala Maven real para compilar el proyecto completo >> mvnw.bat
echo echo Puedes descargarlo de: https://maven.apache.org/download.cgi >> mvnw.bat
echo exit /b 1 >> mvnw.bat

echo ✅ Wrapper creado. Ejecutando...
call mvnw.bat %*

:maven_ready
echo.
echo 🚀 Maven está listo para usar

:end
echo.
echo === FIN ===