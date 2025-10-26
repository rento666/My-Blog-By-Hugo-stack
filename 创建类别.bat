@echo off
echo new category
set /p input= please input the category name: 
hugo new categories/%input%/_index.md
hugo new categories/%input%/_index.en.md
pause
