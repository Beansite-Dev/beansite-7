@echo off
@cls
yarn vercel --prod
yarn firebase deploy
goto :eof