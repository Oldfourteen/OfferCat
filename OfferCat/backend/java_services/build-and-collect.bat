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
    if "%%S"=="user" (
        if exist "%SCRIPT_DIR%%%S\target\%%S-exec.jar" (
            copy /Y "%SCRIPT_DIR%%%S\target\%%S-exec.jar" "%DIST%\" >nul
            echo   Collected: %%S-exec.jar
        ) else (
            echo   [WARN] Not found: %%S\target\%%S-exec.jar
        )
    ) else (
        if exist "%SCRIPT_DIR%%%S\target\%%S.jar" (
            copy /Y "%SCRIPT_DIR%%%S\target\%%S.jar" "%DIST%\" >nul
            echo   Collected: %%S.jar
        ) else (
            echo   [WARN] Not found: %%S\target\%%S.jar
        )
    )
)

echo [3/3] Copying Aliyun secrets next to JARs (method 1: dist\secrets\)...
set DYPNS_SRC=%SCRIPT_DIR%user\secrets\application-dypns.yml
if exist "%DYPNS_SRC%" (
    if not exist "%DIST%\secrets" mkdir "%DIST%\secrets"
    copy /Y "%DYPNS_SRC%" "%DIST%\secrets\application-dypns.yml" >nul
    echo   Collected: dist\secrets\application-dypns.yml
    if not exist "%SCRIPT_DIR%deploy\config" mkdir "%SCRIPT_DIR%deploy\config"
    copy /Y "%DYPNS_SRC%" "%SCRIPT_DIR%deploy\config\application-dypns.yml" >nul
    echo   Collected: deploy\config\application-dypns.yml
) else (
    echo   [WARN] Missing %DYPNS_SRC%
    echo          Copy user\secrets\application-dypns.yml.example and fill AccessKey first.
)

echo.
echo Done! JARs are in: %DIST%
echo.
echo Next steps:
echo   1. Copy dist\*.jar  to server D:\offercat\apps\
echo   2. Copy dist\secrets\  to server D:\offercat\apps\secrets\   (same folder as user.jar)
echo   3. Copy deploy\config\application-prod.yml  to server D:\offercat\config\
echo   4. Copy deploy\config\application-dypns.yml to server D:\offercat\config\  (optional backup)
echo   5. Replace server D:\offercat\bin\start_all.bat with deploy\bin\start_all.bat
echo   6. On server: D:\offercat\bin\start_all.bat start  (or manage.bat restart)
echo.
pause
