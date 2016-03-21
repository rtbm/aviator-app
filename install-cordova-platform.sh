#!/usr/bin/env bash

plugins=(
    cordova-plugin-whitelist
    cordova-plugin-geolocation
    cordova-plugin-camera
    http://github.com/don/cordova-filechooser.git
    phonegap-nfc
)

cordova platform add android@5

for plugin in ${plugins[*]}; do
    cordova plugin add $plugin
done
