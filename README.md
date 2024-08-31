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

**Java** 
* Install OpenJDK Zulu 17

**Android Studio:**
* Install Android Studio
* Install Android SDK Command Line Tools
* Install CMake

**XCode:**
* Install XCode
* Go to Xcode Preferences > Locations and select Command Line Tools.

**Cocoapods**
* Install Cocoapods `sudo gem install cocoapods`

## Project Setup
`npx react-native init EmployeeAdmin`

**iOS Setup**
```shell
cd ios
pod install
```
* Open Workspace in XCode or run `"xed -b ios"` and wait for file indexing
* Select Product > Clean Build Folder
* Optionally, Select Product > Build to launch the terminal and start the Metro server.

**Android Setup**
* Open the project in Android Studio and wait for Gradle to sync and finish
* Ensure the `ndkVersion` in **build.gradle** matches the installed NDK version

## Project Launch
CLI Commands
```shell
npx react-native start  
npx react-native start --port 9988

npx react-native run-ios
npx react-native run-ios --simulator="iPhone 14 Pro"

npx react-native run-android
```

## Older Versions: XCode 14.2 (MacPro Late 2013)
`npx react-native@0.71 init EmployeeAdmin --version 0.71`

Cocoapods with **react-native v0.71** toolset expects **Ruby version 2.7.6**
[Link](https://stackoverflow.com/questions/78099206/react-native-init-cocoapods-was-resolved)
```shell
brew install rbenv
rbenv install 2.7.6
rbenv global 2.7.6
rbenv rehash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

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
[F8app](https://github.com/fbsamples/f8app)
[Sample Apps](https://github.com/SamuelOkoroShow)

## License
* PureMVC TypeScript React Native Demo - Employee Admin - Copyright © 2024 [Saad Shams](https://www.linkedin.com/in/muizz)
* PureMVC Copyright © 2024 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
