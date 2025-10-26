@echo off
echo new tag
set /p input=  please input the tag name: 
hugo new tags/%input%/_index.md
hugo new tags/%input%/_index.en.md
pause
