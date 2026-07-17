@echo off
cd /d "%~dp0backend"
call mvnw.cmd clean spring-boot:run
pause
