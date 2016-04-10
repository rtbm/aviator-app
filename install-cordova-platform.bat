set PLUGINS=(cordova-plugin-whitelist cordova-plugin-geolocation cordova-plugin-camera http://github.com/don/cordova-filechooser.git phonegap-nfc)

for %%i in %PLUGINS% do cordova plugin add %%i
