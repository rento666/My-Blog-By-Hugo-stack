@echo off
echo new post
set /p input= please input the title: 
hugo new post/%Date:~0,4%/%Date:~5,2%%Date:~8,2%-%input%/index.md
pause
