# Voice Of America Mandarin App

## Download the App

* On Apple App Store or Google Play Store

## Pre-requisites

* NodeJS LTS (Download)[https://nodejs.org/en/]
* If you have a globally installed version of Cordova, uninstall.
* Content from `protected.zip`:
  * src/psiphon_config.json
* For iOS build/development, install XCode (only available on MacOS)
* For Android build/development, install [Android Studio](https://developer.android.com/studio/) ([additional setup required](#android-setup))
* Setup Cocoapods
  * `brew install cocoapods` watch out for linking errors and fix them
  * `pod setup`
* While building iOS you may need to:
  * cd platforms/ios
  * `pod install` (or pod update)
  * Always launch `.xcworkspace` in XCode, rather than the `.xcodeproj` to build the project

## Quickstart

To set up:

* `npm install`
* `npm run setup`
  * To set up for just android development, use `npm run setup:android`
  * To set up for just iOS development, use `npm run setup:ios`
* If you have the password to `protected.zip`, you can run `npm run protected:unzip` and supply the password when prompted

To build & run:

* `npm run start:web` - to run in the browser
* `npm run start:android` - to run in an Android emulator or device
* `npm run start:ios` - to run in an iOS emulator or device

For CI:

* `npm run build`

To Publish to TestFlight:

* In XCode, select the project, switch to Build Phases tab, add new script

```
set -e
bash "${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/PsiphonTunnel.framework/strip-frameworks.sh"
```

* In XCode, run `Product -> Archive`
  * Validate the archive
    * Strip and upload symbols _(both boxes checked on first screen)_
    * Have XCode manage signing _(top radio button checked on second screen)_
  * **If and only if validation succeeds** hit "Upload to App Store..." button
    * Strip and upload symbols _(both boxes checked on first screen)_
    * Have XCode manage signing _(top radio button checked on second screen)_
* Go to [iTunes Connect -> My Apps](https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app)
  * Select appropriate app
  * Select the "TestFlight" tab
    * If you don't see your build, it may still be processing
    * You can check on its status in the "Activity" tab
    * If it's processing, wait until it completes (will take 5 - 10 minutes)
  * From the "TestFlight" tab
    * Open your build version
    * If it has a green circle and says "Testing", you're good to go
    * It may require export compliance information:
      1.  Does your app use encryption? Select Yes even if your app only uses the standard encryption in iOS and macOS.
      * Yes
      2.  Does your app qualify for any of the exemptions provided in Category 5, Part 2 of the U.S. Export Administration Regulations?
      * Yes

## Android setup

In order to be able to build and run Android, you'll need to do have the following:

* From SDK Platforms:
  1. At least Android 7.1.1 (api level 25)
* From SDK Tools:
  1.  Android SDK Build-Tools
  1.  Android Emulator
  1.  Android SDK Platform-Tools
  1.  Android SDK Tools
  1.  Intel x86 Emulator Accelerator (HAXM installer)
  1.  Install ADB `brew cask install android-platform-tools`
* Either a working ADV or a physical device that can be connected to the computer
  * When you run `npm run start:android`, you should either see the text `AVD Discovered` or a CLI menu
    * If you see the CLI menu but you see no ADVs (nothing is selectable besides `Quit`), you either need to ensure your physical device is connected properly or create a working ADV
    * If instead, you see text warning of an unhandled promise rejection, cancel the command and try again

## Using this as a base

### Files to update

* `package.json`
  * change the name to be unique for your project
  * change the app id in the `deploy:android` script to be the same as the app id in your `config.xml`
* `config.xml`
  * change the app id to be unique for your project
  * reset the version code and version number to `100000` and `1.0.0` respectively
  * change the name of the app (both short and long) for your project
  * change all of the author fields to the correct information for your project
* `circle.yml`
  * update the cache keys to be unique for your project
    (ex. `v1-your-project-npm-{{ checksum "package-lock.json" }}`)
* `scripts/buildAndroid.sh`
  * update the `--alias` cli argument to be the same as chosen for your [keystore](#generating-a-keystore)
* `src/labels.tsx`
  * this is where all of the static labels for the app live
  * language-specific configuration (date locale, text direction, etc.) lives here, too

### Generating a keystore

Run the following command and follow the prompts:
`keytool -genkey -v -keystore build.keystore -alias [app-name] -keyalg RSA -keysize 2048 -validity 10000`

### Push notifications setup
For iOS, in the developer console you will need to mark your app ID as requiring the push notifications service.  In addition, you will need to create an Apple Push Services certificate.  Once you have both, you will need to use them to create an app in the Firebase console to be able to use push notifications.
