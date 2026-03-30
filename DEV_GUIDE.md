# Developer Guide

This guide explains how to set up the development environment and run the project locally.

---

## Overview

This project uses:

- NodeJS
- Java 17
- Android Studio
- Xcode
- CocoaPods
- React Native CLI / Expo

## Requirements

Install the following tools before starting:

- NodeJS (LTS recommended)
- Java 17
- Android Studio
- Xcode (Mac only)
- CocoaPods (Mac only)
- npm / npx

---

## Environment Setup

**NodeJS**
* Mac: [Install NodeJS ](https://nodejs.org/)(LTS Recommended)
* Windows: [Install Chocolaty](https://chocolatey.org/install) and run `choco install -y nodejs-lts`

**Java**
* Mac:
    * Install Brew: https://brew.sh
    * OpenJDK Zulu 17: `brew install --cask zulu@17`
    * Terminal: `echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home' >> "$HOME/.zshrc"`
    * Or Add to .zshrc: `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`)

* Windows:
    * Microsoft OpenJDK 17: `choco install -y microsoft-openjdk17`
    * Set Variable `JAVA_HOME`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot`
    * Add to `PATH`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot\bin`

**Android Studio:**
* Android Studio Installation
* Android SDK Command Line Tools
* CMake
* Virtual Device
    * Mac: Command line
  ```shell
    cat << 'EOF' >> "$HOME/.zshrc"
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    EOF
  ```
    * Mac: Or add manually to .zshrc
  ```shell
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  ```
    * Windows:
        * Set Variable `ANDROID_HOME`: `C:\Users\{username}\AppData\Local\Android\Sdk`
        * Add to `PATH`
    ```shell
    C:\Users\{username}\AppData\Local\Android\Sdk
    C:\Users\{username}\AppData\Local\Android\Sdk\platform-tools
    C:\Users\{username}\AppData\Local\Android\Sdk\emulator
    C:\Users\{username}\AppData\Local\Android\Sdk\tools
    C:\Users\{username}\AppData\Local\Android\Sdk\tools\bin
    ```

**XCode:**
* XCode Installation
* Go to **Xcode Preferences** > **Locations** and select **Command Line Tools**.

**Cocoapods**
* `sudo gem install cocoapods`

    * **Cocoapods with Xcode 16.2 requires Ruby version >= 3.1.0**: Using Homebrew & rbenv
        ```shell
        brew install rbenv ruby-build
        rbenv install 3.2.2
        rbenv global 3.2.2
        ```

    * **Cocoapods with XCode 14.2 requires Ruby version 2.7.6** - MacPro Late 2013 - React Native v0.71.
      Cocoapods with **react-native v0.71** toolset expects **Ruby version 2.7.6**
      [Reference](https://stackoverflow.com/questions/78099206/react-native-init-cocoapods-was-resolved)
        ```shell
        brew install rbenv
        rbenv install 2.7.6
        rbenv global 2.7.6
        ```
    * Terminal: Restart Terminal.
      ```shell
      cat << 'EOF' >> "$HOME/.zshrc"
      export PATH="$HOME/.rbenv/bin:$PATH"
      eval "$(rbenv init -)"
      EOF
      ```

    * Manual: Add to .zshrc. Restart Terminal.
      ```shell
      export PATH="$HOME/.rbenv/bin:$PATH"
      eval "$(rbenv init -)"
      ```

    * Verify Ruby Version `ruby -v`
    * Reinstall Cocoapods: `sudo gem install cocoapods`

## Project
* Init Project: `npx @react-native-community/cli init employeeadmin`
* Build Android: Have an Android emulator running (quickest way to get started), or a device connected.
    * Mac: `npx react-native run-android` | `cd android && ./gradlew clean && cd ..`
    * Windows: `cd android && .\gradlew clean && cd ..`
* Build iOS: `cd ios && pod install && cd ..`
    * Or open Workspace or run `"xed -b ios"` | Product -> Clean Build Folder | Product -> Build to Start Server
* Start Server: `npm run start` | `npx react-native start` | `npx react-native start --port 9988`
* Launch Android: `npm run android` | `npx react-native run-android`
* Launch iOS: `npm run ios` | `npx react-native run-ios` | `npx react-native run-ios --simulator="iPhone 14 Pro"`

## Expo
`expo init project-name`

### Project (XCode 14.2 with Ruby version 2.7.6** - MacPro Late 2013)
Init: `npx react-native@0.71 init employeeadmin --version 0.71`

## Troubleshooting
* `ENOENT` error on Windows: Create `npm` folder in `C:\Users\{username}\AppData\Roaming`
* Clear Cache: `npx react-native start --reset-cache`
* Rebuild Android: `cd android && ./gradlew clean && cd ..`
  exp://10.210.20.236:8081

## Devices
`adb devices`

## Emulators
```shell
emulator -list-avds
emulator -avd <emulator_name>
```

## Installation
`adb -s emulator-5556 shell am start -a android.intent.action.VIEW -d exp://10.210.20.236:8081`

## Reset Server
```
adb kill-server
adb start-server
adb devices
```

## UI Libraries
* [Material Design](https://rn-material.js.org/)
* [React Native Elements](https://reactnativeelements.com)
* [React Native Paper](https://reactnativepaper.com)
* [Tamagui](https://tamagui.dev)
* [Nativebase](https://nativebase.io)
* [NativeWind](https://www.nativewind.dev)
* [UI Kitten](https://akveo.github.io/react-native-ui-kitten)
* [RNUI](https://wix.github.io/react-native-ui-lib)
* [Gluestack-ui](https://ui.gluestack.io)
* [Restyle](https://github.com/Shopify/restyle)

## Examples
* [F8app](https://github.com/fbsamples/f8app)
* [Sample Apps](https://github.com/SamuelOkoroShow)
