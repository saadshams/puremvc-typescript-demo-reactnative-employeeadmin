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
* Windows: [Install Chocolaty](https://chocolatey.org/install) | `choco install -y nodejs-lts`

**Java** 
* Mac: Install OpenJDK Zulu 17 - Set PATH `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
* Windows: `choco install -y microsoft-openjdk17`
  * Set Variable `JAVA_HOME`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot`
  * Add to `PATH`: `C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot\bin`

**Android Studio:**
* Android Studio Installation
* Android SDK Command Line Tools
* NDK Tools: Match `ndkVersion` from `android/build.gradle`
* CMake
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

## Project
* Init Project: `npx react-native init EmployeeAdmin`
* Build Android: 
  * Mac: `cd android && ./gradlew clean`
  * Windows: `cd android && .\gradlew clean`
* Build iOS: `cd ios && pod install`
  * Or open Workspace or run `"xed -b ios"` | Product -> Clean Build Folder | Product -> Build to Start Server
* Start Server: `npx react-native start` | `npx react-native start --port 9988`
* Launch Android: `npx react-native run-android`
* Launch iOS: `npx react-native run-ios` | `npx react-native run-ios --simulator="iPhone 14 Pro"`

## XCode 14.2 - MacPro Late 2013 - React Native v0.71
### Ruby 2.7.6:
* Cocoapods with **react-native v0.71** toolset expects **Ruby version 2.7.6**
[Reference](https://stackoverflow.com/questions/78099206/react-native-init-cocoapods-was-resolved)

  ```shell
  brew install rbenv
  rbenv install 2.7.6
  rbenv global 2.7.6
  rbenv rehash
  ```
* Add to .zshrc
  ```shell
  export PATH="$HOME/.rbenv/bin:$PATH"
  eval "$(rbenv init -)"
  ```

### Project
Init Project: `npx react-native@0.71 init EmployeeAdmin --version 0.71`

## Troubleshooting
* Clear Cache: `npx react-native start --reset-cache`
* Rebuild Android: `cd android && ./gradlew clean && cd ..`

## UI Libraries
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
* PureMVC TypeScript React Native Demo - Employee Admin - Copyright © 2024 [Saad Shams](https://www.linkedin.com/in/muizz)
* PureMVC Copyright © 2024 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
