# BokKoll

BokKoll is a local-first book library app built with **React Native**,
**Expo**, and **TypeScript**. It helps you keep track of books you own,
search your library, view book details, and mark books as read or
unread.

> **Project status:** Google Books integration is not yet available.
> Books can currently be entered manually. The app uses SQLite for local
> storage.

## Contents

-   [Requirements](#requirements)
-   [Option 1: Test on a physical phone with Expo
    Go](#option-1-test-on-a-physical-phone-with-expo-go)
-   [Option 2: Run the app in a web
    browser](#option-2-run-the-app-in-a-web-browser)
-   [Option 3: Run the app in an Android
    emulator](#option-3-run-the-app-in-an-android-emulator)
-   [Troubleshooting](#troubleshooting)
-   [Current limitations](#current-limitations)

## Requirements

Install the following tools:

-   **Node.js** (use a current LTS release compatible with the project).
-   **Git**, to clone the repository.
-   **npm**, which is included with Node.js.
-   For Android emulation: **Android Studio** and its Android
    SDK/emulator tools.

Check your installations:

``` bash
node --version
npm --version
git --version
```

## Get the repository

Open a terminal and clone the repository:

``` bash
git clone <REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
npm install
```

Replace `<REPOSITORY_URL>` and `<REPOSITORY_FOLDER>` with the actual
repository URL and folder name.

If the repository includes a `package-lock.json`, keep it and use
`npm install` (or `npm ci` for a clean install based on the lockfile).

------------------------------------------------------------------------

## Option 1: Test on a physical phone with Expo Go

### 1. Install Expo Go

-   **Android:** Install Expo Go from [Google
    Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
-   **iPhone:** Install Expo Go from the [Apple App
    Store](https://apps.apple.com/app/expo-go/id982107779).

### 2. Start the development server

From the project folder, run:

``` bash
npx expo start
```

Expo CLI displays a QR code in the terminal (and usually in the
developer tools page).

### 3. Connect your phone

1.  Connect your phone and computer to the same Wi-Fi network.
2.  Open Expo Go on your phone.
3.  Scan the QR code:
    -   On Android, use the QR scanner in Expo Go.
    -   On iPhone, you can usually scan it with the Camera app and open
        the link in Expo Go.
4.  Wait for the JavaScript bundle to load.

If the connection does not work, check the
[Troubleshooting](#troubleshooting) section.

### Important compatibility note

Expo Go only runs projects compatible with the Expo SDK included in the
installed Expo Go app. If Expo Go reports an SDK-version mismatch,
updating Expo Go may not be enough if the installed Expo Go release does
not yet support this repository's SDK.

In that case, use the Android emulator instructions below and create/run
a development build, or use a compatible project SDK. Do not assume that
the QR code alone guarantees the project will run in Expo Go.

------------------------------------------------------------------------

## Option 2: Run the app in a web browser

### 1. Start the web target

From the project folder, run:

``` bash
npx expo start --web
```

If Expo asks to install web dependencies, follow its instructions. You
can also install the standard Expo web dependencies with:

``` bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

Then start the web target again:

``` bash
npx expo start --web
```

Open the local URL shown in the terminal.

### Web and SQLite note

BokKoll uses `expo-sqlite`. Native SQLite support on Android/iOS does
not automatically mean the web target will work in every browser or
project configuration. Web may require additional SQLite/WASM setup and
browser isolation support. If the app reports a SQLite, WASM, or
`SharedArrayBuffer` error, use the Android emulator option for testing
rather than treating it as an application setup error.

------------------------------------------------------------------------

## Option 3: Run the app in an Android emulator

This option runs Android in a virtual device on your computer. It is
useful if you do not have a compatible phone or Expo Go cannot run the
project's SDK.

### 1. Install Android Studio

Download and install **Android Studio**:

https://developer.android.com/studio

During installation, allow Android Studio to install the Android SDK and
Android Virtual Device (AVD) components.

### 2. Install the Android SDK and emulator

1.  Open Android Studio.
2.  On the welcome screen, open **More Actions → SDK Manager**. If a
    project is open, use **Tools → SDK Manager**.
3.  In **SDK Platforms**, install an Android platform supported by the
    current Expo/React Native project.
4.  In **SDK Tools**, make sure these are installed:
    -   Android SDK Build-Tools
    -   Android SDK Platform-Tools
    -   Android Emulator
5.  Click **Apply** and let the installation finish.

The precise Android API level may change with Expo/React Native
releases. Use the version required by the project's Expo SDK rather than
assuming that the newest preview platform is compatible.

### 3. Create a virtual Android device

1.  In Android Studio, open **More Actions → Virtual Device Manager**
    (or **Tools → Device Manager**).
2.  Click **Create Device**.
3.  Choose a phone profile, such as a Pixel device, and click **Next**.
4.  Select a stable system image compatible with your computer:
    -   Choose an **x86_64** image on most Intel/AMD Windows/Linux
        computers.
    -   Choose an **ARM** image where appropriate for your host
        platform.
5.  Download the image if prompted.
6.  Finish creating the device.
7.  Press the **Play** button beside the device to start it.
8.  Wait until Android finishes booting and the home screen appears.

### 4. Enable virtualization if the emulator will not start

Hardware virtualization must be enabled for many emulator
configurations.

-   On Windows, check that CPU virtualization (Intel VT-x or AMD-V/SVM)
    is enabled in your computer's BIOS/UEFI.
-   Make sure the Windows hypervisor components required by your Android
    Emulator configuration are enabled.
-   Restart the computer after changing BIOS/UEFI settings.

The exact steps depend on your computer and Windows version. Follow the
Android Studio documentation if the emulator reports a virtualization or
hypervisor error.

### 5. Verify that Android Debug Bridge (ADB) sees the emulator

With the emulator running, open a terminal and run:

``` bash
adb devices
```

You should see an emulator entry, usually similar to:

``` text
List of devices attached
emulator-5554   device
```

If `adb` is not recognized, add the Android SDK `platform-tools`
directory to your system `PATH`, or run `adb` from that directory.

### 6. Start BokKoll on Android

From the repository folder:

``` bash
npm install
npx expo start
```

Then:

-   Press **`a`** in the Expo terminal to open the app on the running
    Android emulator, if the project is compatible with Expo Go.
-   If Expo Go is not compatible with the project's SDK, create and run
    a **development build** instead.

For a development build, install the Android native project
prerequisites above, then use the Expo development-build workflow
documented here:

https://docs.expo.dev/develop/development-builds/introduction/

A typical local Android development-build command is:

``` bash
npx expo run:android
```

This command builds and installs the native Android app, so it may take
several minutes the first time. After it finishes, start the development
server as instructed by Expo and open the installed development app.

> If `npx expo run:android` reports that the Android SDK or Java is
> missing, configure Android Studio's SDK/JDK settings and environment
> variables according to the Expo and Android documentation.

------------------------------------------------------------------------

## Troubleshooting

### Expo Go reports an SDK version mismatch

The installed Expo Go version does not support the SDK used by this
repository. Try updating Expo Go. If the mismatch remains, use a
development build or a project SDK supported by Expo Go.

### The phone cannot connect to the development server

-   Confirm the phone and computer are on the same Wi-Fi network.
-   Temporarily check whether a firewall or VPN is blocking the
    connection.
-   Restart the Expo server.
-   If your network blocks local device connections, consult Expo's
    documentation for tunnel connections. Tunnel services may require
    additional setup and can be less reliable.

### Android emulator does not appear

-   Start the virtual device in Android Studio first.
-   Run `adb devices`.
-   Confirm Android SDK Platform-Tools is installed and available in
    `PATH`.
-   Restart the emulator and, if necessary, Android Studio.

### Android emulator fails during startup

Check that hardware virtualization is enabled in BIOS/UEFI and that the
required hypervisor components are installed for your operating system.

### Web reports a SQLite, WASM, or `SharedArrayBuffer` error

The current web configuration may not support the SQLite setup used by
the app. Use the Android emulator for testing, or configure and verify
web SQLite support separately.

### Reset the Metro bundler cache

If the app behaves as though stale JavaScript is being loaded, stop Expo
and run:

``` bash
npx expo start --clear
```

------------------------------------------------------------------------

## Current limitations

-   The app currently stores its library locally in SQLite on the
    device/emulator.
-   Google Books lookup and automatic metadata/cover retrieval are not
    implemented yet.
-   Web support depends on compatible SQLite/WASM configuration.
-   Expo Go compatibility depends on whether the installed Expo Go
    release supports this repository's Expo SDK. A development build is
    the fallback when it does not.

## Useful documentation

-   [Expo documentation](https://docs.expo.dev/)
-   [Expo Go](https://expo.dev/go)
-   [Expo development
    builds](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android Studio](https://developer.android.com/studio)
-   [Android
    Emulator](https://developer.android.com/studio/run/emulator)
