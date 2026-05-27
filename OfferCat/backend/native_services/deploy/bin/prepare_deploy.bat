@echo off
REM Optional helper for local packaging. On server, source tree is used directly.
echo Server layout expected by start_pdf_radar.bat:
echo   backend\cpp_services\resume-pdf\
echo   backend\cpp_services\radar-evaluation\radar_server.cpp
echo   backend\cpp_services\radar-evaluation-py\radar_server_py.cpp
echo   backend\python_services\radar-evaluation\app.py
echo.
echo Upload deploy\bin\ to backend\native_services\deploy\bin\ and run start_services.bat
pause
