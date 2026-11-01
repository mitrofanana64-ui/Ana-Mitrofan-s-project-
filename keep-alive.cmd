@echo off
cd /d "C:\Users\ancap\OneDrive\Desktop\website\bac-ai"
set "PATH=%PATH%;C:\Users\ancap\OneDrive\Desktop\website\node-v20.17.0-win-x64"
:loop
"C:\Users\ancap\OneDrive\Desktop\website\node-v20.17.0-win-x64\node.exe" "C:\Users\ancap\OneDrive\Desktop\website\bac-ai\server.js"
timeout /t 2 /nobreak >nul
goto loop
