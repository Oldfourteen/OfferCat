@echo off
setlocal enabledelayedexpansion

REM OfferCat native services launcher (PDF + Radar)
REM Server layout (relative to backend\):
REM   cpp_services\resume-pdf\
REM   cpp_services\radar-evaluation\          radar_server.cpp
REM   cpp_services\radar-evaluation-py\       radar_server_py.cpp
REM   python_services\radar-evaluation\       app.py
REM
REM Place this script at: backend\native_services\deploy\bin\

set "BACKEND=%~dp0..\..\.."
set "LOG=%~dp0..\logs"
set "SRC_PDF=%BACKEND%\cpp_services\resume-pdf"
set "SRC_RADAR=%BACKEND%\cpp_services\radar-evaluation"
set "SRC_RADAR_PY=%BACKEND%\cpp_services\radar-evaluation-py"
set "RADAR_PYTHON=%BACKEND%\python_services\radar-evaluation"

set "PDF_NODE=%SRC_PDF%\node_highlight"
set "PDF_KEYWORDS=%SRC_PDF%\keywords"
set "PDF_CPP_EXE="
set "PDF_CPP_DIR="

set "NODE_HIGHLIGHT_URL=http://127.0.0.1:30081"
set "RESUME_PDF_PORT=22570"

set "STARTED=0"
set "SKIPPED=0"
set "FAILED=0"

if not exist "%LOG%" mkdir "%LOG%"

if /I "%1"=="start"   goto START
if /I "%1"=="stop"    goto STOP
if /I "%1"=="restart" goto RESTART

echo Usage:
echo   start_pdf_radar.bat start
echo   start_pdf_radar.bat stop
echo   start_pdf_radar.bat restart
exit /b 1


:START
echo ============================================
echo   Building C++ services ...
echo ============================================
call :buildPdfCpp
call :buildRadarCpp
call :buildRadarCppPy
echo.

echo ============================================
echo   Starting services ...
echo ============================================
echo Starting pdf-node ...
call :startPdfNode
timeout /t 3 >nul

echo Starting pdf-cpp ...
call :startPdfCpp
timeout /t 2 >nul

echo Starting radar-cpp ...
call :startRadarCpp
call :startRadarCppPy
timeout /t 2 >nul

echo Starting radar-python ...
call :startRadarPython

echo.
echo ============================================
echo   Started: !STARTED!   Skipped: !SKIPPED!   Failed: !FAILED!
echo ============================================
if !STARTED! equ 0 (
  echo [ERROR] No service was started. Check messages and logs in deploy\logs\.
  exit /b 1
)
if !SKIPPED! gtr 0 (
  echo [WARN] Some services were skipped. Check messages above.
  exit /b 1
)
if !FAILED! gtr 0 (
  echo [WARN] Some build or install steps failed. Check logs in deploy\logs\.
  exit /b 1
)
echo All native services started successfully.
exit /b 0


:STOP
call :stopOne pdf-node
call :stopOne pdf-cpp
call :stopOne radar-cpp
call :stopOne radar-cpp-py
call :stopOne radar-python

echo All native services stopped.
exit /b 0


:RESTART
call "%~f0" stop
timeout /t 2 >nul
call "%~f0" start
exit /b !errorlevel!


:buildPdfCpp
if not exist "%SRC_PDF%\src\main.cpp" (
  echo [ERROR] Missing PDF source: %SRC_PDF%\src\main.cpp
  set /a FAILED+=1
  goto :eof
)

echo Building resume_pdf_service.exe ...

where cmake >nul 2>&1
if not errorlevel 1 (
  pushd "%SRC_PDF%"
  cmake -S . -B build -DCMAKE_BUILD_TYPE=Release >>"%LOG%\pdf-cpp-build.log" 2>&1
  if errorlevel 1 (
    echo [ERROR] cmake configure failed, see %LOG%\pdf-cpp-build.log
    popd
    set /a FAILED+=1
    goto :eof
  )
  cmake --build build --config Release >>"%LOG%\pdf-cpp-build.log" 2>&1
  popd
  if exist "%SRC_PDF%\build\Release\resume_pdf_service.exe" (
    set "PDF_CPP_EXE=%SRC_PDF%\build\Release\resume_pdf_service.exe"
    set "PDF_CPP_DIR=%SRC_PDF%\build\Release"
  ) else if exist "%SRC_PDF%\build\resume_pdf_service.exe" (
    set "PDF_CPP_EXE=%SRC_PDF%\build\resume_pdf_service.exe"
    set "PDF_CPP_DIR=%SRC_PDF%\build"
  )
) else (
  where g++ >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] Neither cmake nor g++ found. Install CMake or MinGW g++.
    set /a FAILED+=1
    goto :eof
  )
  echo [INFO] cmake not found, using g++ ...
  if not exist "%SRC_PDF%\build" mkdir "%SRC_PDF%\build"
  pushd "%SRC_PDF%"
  g++ -std=c++17 -O2 -pipe src/main.cpp src/highlight_engine.cpp src/resume_segments.cpp src/keyword_loader.cpp -o build/resume_pdf_service.exe -lws2_32 -I. >>"%LOG%\pdf-cpp-build.log" 2>&1
  popd
  if exist "%SRC_PDF%\build\resume_pdf_service.exe" (
    set "PDF_CPP_EXE=%SRC_PDF%\build\resume_pdf_service.exe"
    set "PDF_CPP_DIR=%SRC_PDF%\build"
  )
)

if exist "!PDF_CPP_EXE!" (
  echo [OK] Built !PDF_CPP_EXE!
) else (
  echo [ERROR] pdf-cpp build failed, see %LOG%\pdf-cpp-build.log
  set /a FAILED+=1
)
goto :eof


:buildRadarCpp
if not exist "%SRC_RADAR%\radar_server.cpp" (
  echo [ERROR] Missing %SRC_RADAR%\radar_server.cpp
  set /a FAILED+=1
  goto :eof
)

where g++ >nul 2>&1
if errorlevel 1 (
  echo [ERROR] g++ not found. Install MinGW and add it to PATH.
  set /a FAILED+=1
  goto :eof
)

echo Building radar_server.exe ...
pushd "%SRC_RADAR%"
g++ -std=c++17 -O2 radar_server.cpp -o radar_server.exe -lws2_32 >>"%LOG%\radar-cpp-build.log" 2>&1
popd

if exist "%SRC_RADAR%\radar_server.exe" (
  echo [OK] Built %SRC_RADAR%\radar_server.exe
) else (
  echo [ERROR] radar-cpp build failed, see %LOG%\radar-cpp-build.log
  set /a FAILED+=1
)
goto :eof


:buildRadarCppPy
if not exist "%SRC_RADAR_PY%\radar_server_py.cpp" (
  echo [ERROR] Missing %SRC_RADAR_PY%\radar_server_py.cpp
  set /a FAILED+=1
  goto :eof
)

where g++ >nul 2>&1
if errorlevel 1 (
  echo [ERROR] g++ not found. Install MinGW and add it to PATH.
  set /a FAILED+=1
  goto :eof
)

echo Building radar_server_py.exe ...
pushd "%SRC_RADAR_PY%"
g++ -std=c++17 -O2 radar_server_py.cpp -o radar_server_py.exe -lws2_32 >>"%LOG%\radar-cpp-py-build.log" 2>&1
popd

if exist "%SRC_RADAR_PY%\radar_server_py.exe" (
  echo [OK] Built %SRC_RADAR_PY%\radar_server_py.exe
) else (
  echo [ERROR] radar-cpp-py build failed, see %LOG%\radar-cpp-py-build.log
  set /a FAILED+=1
)
goto :eof


:startPdfNode
if not exist "%PDF_NODE%\package.json" (
  echo [WARN] Missing %PDF_NODE%\package.json, skip pdf-node
  set /a SKIPPED+=1
  goto :eof
)

if not exist "%PDF_NODE%\node_modules" (
  echo Installing npm dependencies for pdf-node ...
  pushd "%PDF_NODE%"
  call npm install >>"%LOG%\pdf-node-install.log" 2>&1
  if errorlevel 1 (
    echo [ERROR] npm install failed, see %LOG%\pdf-node-install.log
    popd
    set /a FAILED+=1
    goto :eof
  )
  popd
)

echo Starting pdf-node (port 30081) ...
start "pdf-node" cmd /k "title pdf-node && cd /d "%PDF_NODE%" && npm start 1>>"%LOG%\pdf-node.log" 2>>&1"
set /a STARTED+=1
goto :eof


:startPdfCpp
if not exist "!PDF_CPP_EXE!" (
  echo [WARN] resume_pdf_service.exe not available, skip pdf-cpp
  set /a SKIPPED+=1
  goto :eof
)

if not exist "%PDF_KEYWORDS%" (
  echo [WARN] Missing keywords dir: %PDF_KEYWORDS%, skip pdf-cpp
  set /a SKIPPED+=1
  goto :eof
)

echo Starting pdf-cpp (port %RESUME_PDF_PORT%) ...
start "pdf-cpp" cmd /k "title pdf-cpp && cd /d "!PDF_CPP_DIR!" && set NODE_HIGHLIGHT_URL=%NODE_HIGHLIGHT_URL% && set RESUME_PDF_PORT=%RESUME_PDF_PORT% && set RESUME_PDF_KEYWORDS_DIR=%PDF_KEYWORDS% && resume_pdf_service.exe 1>>"%LOG%\pdf-cpp.log" 2>>&1"
set /a STARTED+=1
goto :eof


:startRadarCpp
if not exist "%SRC_RADAR%\radar_server.exe" (
  echo [WARN] radar_server.exe not available, skip radar-cpp
  set /a SKIPPED+=1
  goto :eof
)

echo Starting radar-cpp (port 22565) ...
start "radar-cpp" cmd /k "title radar-cpp && cd /d "%SRC_RADAR%" && radar_server.exe 1>>"%LOG%\radar-cpp.log" 2>>&1"
set /a STARTED+=1
goto :eof


:startRadarCppPy
if not exist "%SRC_RADAR_PY%\radar_server_py.exe" (
  echo [WARN] radar_server_py.exe not available, skip radar-cpp-py
  set /a SKIPPED+=1
  goto :eof
)

echo Starting radar-cpp-py ...
start "radar-cpp-py" cmd /k "title radar-cpp-py && cd /d "%SRC_RADAR_PY%" && radar_server_py.exe 1>>"%LOG%\radar-cpp-py.log" 2>>&1"
set /a STARTED+=1
goto :eof


:startRadarPython
if not exist "%RADAR_PYTHON%\app.py" (
  echo [WARN] Missing %RADAR_PYTHON%\app.py, skip radar-python
  set /a SKIPPED+=1
  goto :eof
)

if not exist "%RADAR_PYTHON%\.deps_installed" (
  echo Installing Python dependencies for radar-python ...
  pushd "%RADAR_PYTHON%"
  pip install -r requirements.txt >>"%LOG%\radar-python-install.log" 2>&1
  if errorlevel 1 (
    echo [ERROR] pip install failed, see %LOG%\radar-python-install.log
    popd
    set /a FAILED+=1
    goto :eof
  )
  echo installed > .deps_installed
  popd
)

echo Starting radar-python (port 15000) ...
start "radar-python" cmd /k "title radar-python && cd /d "%RADAR_PYTHON%" && python app.py 1>>"%LOG%\radar-python.log" 2>>&1"
set /a STARTED+=1
goto :eof


:stopOne
set "NAME=%1"
echo Stopping %NAME% ...
taskkill /FI "WINDOWTITLE eq %NAME%" /T /F >nul 2>&1
goto :eof
