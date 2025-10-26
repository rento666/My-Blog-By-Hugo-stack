@echo off
echo new post
set /p input= please input the title: 
hugo new post/%Date:~0,4%/%input%/index.md
hugo new post/%Date:~0,4%/%input%/index.en.md
pause
