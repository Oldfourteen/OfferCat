@echo off
setlocal enabledelayedexpansion

set BASE=%~dp0..
set APP=%BASE%\..\dist
set LOG=%BASE%\logs
set CFG=%BASE%\config

if not exist "%LOG%" mkdir "%LOG%"

REM ====== 服务配置（窗口标�?服务名，JAR=文件名）======
set S1_NAME=registry
set S1_JAR=registry.jar

set S2_NAME=user
set S2_JAR=user.jar

set S3_NAME=student
set S3_JAR=student.jar

set S4_NAME=resume
set S4_JAR=resume.jar

set S5_NAME=radar
set S5_JAR=radar_evaluation.jar

set S6_NAME=ai
set S6_JAR=ai_evaluation.jar

set S7_NAME=galaxy
set S7_JAR=galaxy.jar

set S8_NAME=gateway
set S8_JAR=api_gateway.jar

REM ====== 命令入口 ======
if /I "%1"=="start"   goto START
if /I "%1"=="stop"    goto STOP
if /I "%1"=="restart" goto RESTART

echo 用法:
echo   start_all.bat start
echo   start_all.bat stop
echo   start_all.bat restart
exit /b 1


:START
call :startOne %S1_NAME% %S1_JAR%
timeout /t 6 >nul

call :startOne %S2_NAME% %S2_JAR%
call :startOne %S3_NAME% %S3_JAR%
call :startOne %S4_NAME% %S4_JAR%
call :startOne %S5_NAME% %S5_JAR%
call :startOne %S6_NAME% %S6_JAR%
call :startOne %S7_NAME% %S7_JAR%
timeout /t 6 >nul

call :startOne %S8_NAME% %S8_JAR%

echo All services started.
exit /b 0


:STOP
call :stopOne %S8_NAME%
call :stopOne %S7_NAME%
call :stopOne %S6_NAME%
call :stopOne %S5_NAME%
call :stopOne %S4_NAME%
call :stopOne %S3_NAME%
call :stopOne %S2_NAME%
call :stopOne %S1_NAME%

echo All services stopped.
exit /b 0


:RESTART
call "%~f0" stop
timeout /t 2 >nul
call "%~f0" start
exit /b 0


REM ====== 启动一个服�?======
:startOne
set NAME=%1
set JAR=%2

if not exist "%APP%\%JAR%" (
  echo [WARN] 找不�?%APP%\%JAR% ，跳�?%NAME%
  goto :eof
)

echo Starting %NAME% (%JAR%)...

start "%NAME%" cmd /k ^
  "title %NAME% && cd /d "%APP%" && java -jar "%APP%\%JAR%" --spring.profiles.active=prod --spring.config.additional-location="%CFG%\" 1>>"%LOG%\%NAME%.log" 2>>&1"

goto :eof


REM ====== 停止一个服�?======
:stopOne
set NAME=%1
echo Stopping %NAME% ...
taskkill /FI "WINDOWTITLE eq %NAME%" /T /F >nul 2>&1
goto :eof
