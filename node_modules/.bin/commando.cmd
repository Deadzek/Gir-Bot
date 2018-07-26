@IF EXIST "%~dp0\coffee.exe" (
  "%~dp0\coffee.exe"  "%~dp0\..\commando\bin\cli.coffee" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  coffee  "%~dp0\..\commando\bin\cli.coffee" %*
)