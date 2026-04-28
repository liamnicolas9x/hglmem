@echo off
echo =========================
echo     HGLMEM DEPLOY
echo =========================

cd /d %~dp0

git add .

git diff --cached --quiet
IF %ERRORLEVEL%==0 (
echo No changes detected, forcing deploy...
git commit --allow-empty -m "force deploy %date% %time%"
) ELSE (
git commit -m "update %date% %time%"
)

git push origin main

echo.
echo DONE! Check Vercel Deployments...
pause
