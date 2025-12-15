#!/bin/bash
export ANDROID_HOME=~/android-sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
cd "/mnt/c/Users/USER/Videos/Jev_Playground/Android Playground/Sholatku/sholatku"
npm install
npx eas-cli build --platform android --local --profile preview
