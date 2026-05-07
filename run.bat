@echo off
echo ==============================================
echo      Starting Budget Buddy Application...
echo ==============================================

:: Check if node_modules exists, if not run npm install
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    npm install
)

:: Sync Database (optional but good for safety)
echo [INFO] Syncing Database...
call npx prisma db push

:: Start the Next.js development server
echo [INFO] Starting Development Server...
npm run dev

pause
