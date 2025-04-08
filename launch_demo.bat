@echo off
REM Batch file to launch the Grastille Lore Explorer demo

echo Starting Python HTTP server for Grastille Lore Explorer...

REM Change to the project's root directory
cd /d "C:\AI_Projects\Vampire RPG - Grastille"

echo Current directory: %cd%

REM Check if Python is available
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python not found in PATH. Please install Python 3 and ensure it's added to your PATH.
    pause
    exit /b 1
)

echo Launching server on http://localhost:8000
echo Access the demo at: http://localhost:8000/interactive_demo/

REM Optional: Automatically open the default web browser to the demo page
echo Opening demo in browser...
start http://localhost:8000/interactive_demo/

echo.
echo Starting server...
echo Press Ctrl+C in this window to stop the server.
echo.

REM Start the Python 3 HTTP server. This command will keep the window open.
python -m http.server 8000

REM The script will pause here after the server is stopped (e.g., with Ctrl+C)
echo Server stopped.
pause 