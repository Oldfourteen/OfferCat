@echo off
setlocal enabledelayedexpansion

set BASE=D:\offercat
set APP=%BASE%\apps
set LOG=%BASE%\logs
set CFG=%BASE%\config

if not exist "%LOG%" mkdir "%LOG%"

if /I "%1"=="start"   goto START
if /I "%1"=="stop"    goto STOP
if /I "%1"=="restart" goto RESTART

:MENU
cls
echo ============================================
echo   OfferCat Service Manager
echo ============================================
echo   1. Start  all services
echo   2. Stop   all services
echo   3. Restart all services
echo   4. Exit
echo ============================================
set /p OPT=Select [1-4]:
if "%OPT%"=="1" goto START
if "%OPT%"=="2" goto STOP
if "%OPT%"=="3" goto RESTART
if "%OPT%"=="4" exit /b 0
goto MENU

:START
echo Starting registry ...
if exist "%APP%\registry.jar" ( start "registry" cmd /k "title registry && java -jar %APP%\registry.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\registry.log 2>>&1" ) else ( echo [WARN] registry.jar not found )
timeout /t 6 >nul
echo Starting user ...
if exist "%APP%\user.jar" ( start "user" cmd /k "title user && cd /d "%APP%" && java -jar "%APP%\user.jar" --spring.profiles.active=prod --spring.config.additional-location="%CFG%\" 1>>%LOG%\user.log 2>>&1" ) else ( echo [WARN] user.jar not found )
echo Starting student ...
if exist "%APP%\student.jar" ( start "student" cmd /k "title student && java -jar %APP%\student.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\student.log 2>>&1" ) else ( echo [WARN] student.jar not found )
echo Starting resume ...
if exist "%APP%\resume.jar" ( start "resume" cmd /k "title resume && java -jar %APP%\resume.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\resume.log 2>>&1" ) else ( echo [WARN] resume.jar not found )
echo Starting radar ...
if exist "%APP%\radar_evaluation.jar" ( start "radar" cmd /k "title radar && java -jar %APP%\radar_evaluation.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\radar.log 2>>&1" ) else ( echo [WARN] radar_evaluation.jar not found )
echo Starting ai ...
if exist "%APP%\ai_evaluation.jar" ( start "ai" cmd /k "title ai && java -jar %APP%\ai_evaluation.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\ai.log 2>>&1" ) else ( echo [WARN] ai_evaluation.jar not found )
echo Starting galaxy ...
if exist "%APP%\galaxy.jar" ( start "galaxy" cmd /k "title galaxy && java -jar %APP%\galaxy.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\galaxy.log 2>>&1" ) else ( echo [WARN] galaxy.jar not found )
timeout /t 6 >nul
echo Starting gateway ...
if exist "%APP%\api_gateway.jar" ( start "gateway" cmd /k "title gateway && java -jar %APP%\api_gateway.jar --spring.profiles.active=prod --spring.config.additional-location=%CFG%\ 1>>%LOG%\gateway.log 2>>&1" ) else ( echo [WARN] api_gateway.jar not found )
echo All services started.
pause
exit /b 0

:STOP
echo Stopping all ...
taskkill /FI "WINDOWTITLE eq gateway" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq galaxy" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq ai" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq radar" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq resume" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq student" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq user" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq registry" /T /F >nul 2>&1
echo All services stopped.
pause
exit /b 0

:RESTART
echo Stopping all ...
taskkill /FI "WINDOWTITLE eq gateway" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq galaxy" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq ai" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq radar" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq resume" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq student" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq user" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq registry" /T /F >nul 2>&1
timeout /t 3 >nul
goto START
