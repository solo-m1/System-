# The System - Android app

Builds an installable APK in the cloud (GitHub Actions). No Android Studio needed.

## Build the APK (phone or computer)
1. Create a free GitHub account and a new **private** repository.
2. Upload everything in this folder (or just `the-system-android.zip`, the workflow unpacks it).
   Make sure the `.github/workflows/build-apk.yml` file is included.
3. Open the repo > **Actions** > **Build APK** > **Run workflow**.
4. When it finishes (about 5-8 min), open the run and download the **the-system-apk** artifact.
5. Unzip it and install `app-debug.apk` (allow "install unknown apps" for your browser/files app).

## Keep your progress (important)
The app has its own storage, separate from the website version.
1. In the OLD web version: Settings > **Export backup**.
2. Install the app, open Settings > **Import backup** (or **Paste backup text**).
Later updates are signed with the same key (`android-signing/app.keystore`), so installing a new APK over the old one keeps your data. Still export a backup now and then.

## Alerts
On first launch allow notifications, and "exact alarms" when asked. Use Settings > **Test alert**, then close the app and lock the phone to confirm it arrives.
Some phones (Xiaomi, Oppo, Samsung, Huawei) kill background apps. If alerts don't arrive: Settings > Apps > The System > Battery > **Unrestricted**, and allow Autostart if your phone has it. See dontkillmyapp.com.
Alerts are scheduled about 4 days ahead each time you open the app. Open it at least every few days.
The app is a debug-signed build for personal use, not for the Play Store.
