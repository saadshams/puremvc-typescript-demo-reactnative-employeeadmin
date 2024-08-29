## [PureMVC](http://puremvc.github.com/) [TypeScript](https://github.com/PureMVC/puremvc-typescript-multicore-framework/wiki) [ReactNative](https://en.wikipedia.org/wiki/React_Native) Demo - Employee Admin [![Playwright Tests](https://github.com/PureMVC/puremvc-typescript-demo-employeeadmin/actions/workflows/playwright.yml/badge.svg)](https://github.com/PureMVC/puremvc-js-demo-employeeadmin/actions/workflows/playwright.yml)
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

## Environment

** Install OpenJDK Zulu 17**

**Android Studio:**
Install Android SDK command line tools
Install CMake (in android studio)
Ndk version (match with android project)
from Android Studio, Android SDK (Show Package Details)

**XCode:**
Preferences -> Locations -> Command Line Tools
Select Xcode 14.2 (14C18) from the drop down, enter password

`sudo gem install cocoapods`

## Project
`npx react-native init EmployeeAdmin`

**iOS Setup**
```shell
cd ios
pod install
```
Open workspace file (EmployeeAdmin/ios/EmployeeAdmin.xcworkspace)
Wait for Xcode to index the files.
Go to Product > Clean Build Folder.
Then, click Product > Build. (launches terminal and runs metro server)
Alternatively, you can use the command `"xed -b ios"`
Hit the Run button

**Android Setup**

Open the project in Android Studio from the android folder.
Wait for Gradle to sync and finish.

CLI Commands
```shell
npx react-native start  
npx react-native start --port 9988

npx react-native run-ios
npx react-native run-ios --simulator="iPhone 14 Pro"

npx react-native run-android
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

## For XCode 14.2 (MacPro Late 2013)
    npx react-native@0.71 init EmployeeAdmin --version 0.71
`pod install` will give error because
**react-native v0.71** toolset expects **Ruby version 2.7.6**
[Link](https://stackoverflow.com/questions/78099206/react-native-init-cocoapods-was-resolved)

```shell
brew install rbenv
rbenv install 2.7.6
rbenv global 2.7.6
rbenv rehash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

before: ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.x86_64-darwin21]
after: ruby 2.7.6p219 (2022-04-12 revision c9c2245c0a) [x86_64-darwin21]



## License
* PureMVC TypeScript React Native Demo - Employee Admin - Copyright © 2024 [Saad Shams](https://www.linkedin.com/in/muizz)
* PureMVC Copyright © 2024 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
