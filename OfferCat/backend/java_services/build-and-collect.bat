@echo off
setlocal enabledelayedexpansion

set SCRIPT_DIR=%~dp0
set DIST=%SCRIPT_DIR%dist

echo ==============================
echo  OfferCat Build Script
echo ==============================

echo [1/2] Running mvn clean package -DskipTests ...
call mvn clean package -DskipTests -f "%SCRIPT_DIR%pom.xml" -Dmaven.repo.local="%SCRIPT_DIR%.m2-build"
if errorlevel 1 (
    echo [ERROR] Maven build failed.
    pause
    exit /b 1
)

echo [2/2] Collecting JARs to dist\
if not exist "%DIST%" mkdir "%DIST%"

for %%S in (registry api_gateway user student resume ai_evaluation radar_evaluation galaxy question_bank) do (
    if exist "%SCRIPT_DIR%%%S\target\%%S.jar" (
        copy /Y "%SCRIPT_DIR%%%S\target\%%S.jar" "%DIST%\" >nul
        echo   Collected: %%S.jar
    ) else (
        echo   [WARN] Not found: %%S\target\%%S.jar
    )
)

echo.
echo Done! JARs are in: %DIST%
echo.
echo Next steps:
echo   1. Copy dist\*.jar  to server D:\offercat\apps\
echo   2. Copy deploy\config\application-prod.yml  to server D:\offercat\config\
echo   3. Replace server D:\offercat\bin\start_all.bat with deploy\bin\start_all.bat
echo   4. On server: D:\offercat\bin\start_all.bat start
echo.
pause
