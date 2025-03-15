## [PureMVC](https://puremvc.org) [TypeScript](https://github.com/PureMVC/puremvc-typescript-multicore-framework/wiki) [ReactNative](https://en.wikipedia.org/wiki/React_Native) Demo - Employee Admin
This demo illustrates techniques for performing routine client-side maintenance operations in a PureMVC-based application.

## Installation
```shell
git clone https://github.com/PureMVC/puremvc-js-demo-microservice-employeeadmin
cd puremvc-js-demo-microservice-employeeadmin
docker compose up

cd ..

git clone https://github.com/PureMVC/puremvc-typescript-demo-reactnative-employeeadmin 
cd puremvc-typescript-demo-reactnative-employeeadmin 
npm start
```

## Usage

`* Import assets/postman.json collection into postman
`* Launch [Adminer](http://localhost:8080/?server=mysql&username=mysql&db=employeeadmin) pwd: password


## Screenshot
![PureMVC ReactNative Demo: Employee Admin]()

## Status
Production - [Version 1.0.0](https://github.com/PureMVC/puremvc-js-demo-react-employeeadmin/blob/master/VERSION)

## Platforms / Technologies
* [ReactNative](https://en.wikipedia.org/wiki/React_Native)
* [TypeScript](https://en.wikipedia.org/wiki/TypeScript)
* [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
* [ECMA](https://en.wikipedia.org/wiki/ECMAScript)

## Environment Setup

**NodeJS**
* Mac: **NodeJS** Installation (LTS Recommended)
* Windows: [Install Chocolaty](https://chocolatey.org/install) and run `choco install -y nodejs-lts`

**Java** 
* Mac: 
  * Install Brew: https://brew.sh
  * OpenJDK Zulu 17: `brew install --cask zulu@17`
  * Add to .zshrc: `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
* Windows: 
  * Microsoft OpenJDK 17: `choco install -y microsoft-openjdk17`
  * Set Variable `JAVA_HOME`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot`
  * Add to `PATH`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot\bin`

**Android Studio:**
* Android Studio Installation
* Android SDK Command Line Tools
* NDK Tools: Confirm `ndkVersion` with `android/build.gradle`
* CMake
* Virtual Device
  * Mac: Add to .zshrc
  ```shell
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
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
  * Restart your terminal. Add to .zshrc
    ```shell
    export PATH="$HOME/.r[README.md](README.md)benv/bin:$PATH"
    eval "$(rbenv init -)"
    ```
    
  * Verify Ruby Version `ruby -v`
  * Reinstall Cocoapods: `sudo gem install cocoapods`

## Project
* Init Project: `npx @react-native-community/cli init EmployeeAdmin`
* Build Android: Have an Android emulator running (quickest way to get started), or a device connected.
  * Mac: `npx react-native run-android` || `cd android && ./gradlew clean && cd ..`
  * Windows: `cd android && .\gradlew clean && cd ..`
* Build iOS: `cd ios && pod install && cd ..`
  * Or open Workspace or run `"xed -b ios"` | Product -> Clean Build Folder | Product -> Build to Start Server
* Start Server: `npx react-native start` | `npx react-native start --port 9988`
* Launch Android: `npx react-native run-android`
* Launch iOS: `npx react-native run-ios` | `npx react-native run-ios --simulator="iPhone 14 Pro"`

## Expo
`expo init project-name`

### Project
Init: `npx react-native@0.71 init EmployeeAdmin --version 0.71`

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

## License
* PureMVC TypeScript React Native Demo - Employee Admin - Copyright © 2024 [Saad Shams](https://www.linkedin.com/in/muizz), [Cliff Hall](https://www.linkedin.com/in/cliff)
* PureMVC Copyright © 2024 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
