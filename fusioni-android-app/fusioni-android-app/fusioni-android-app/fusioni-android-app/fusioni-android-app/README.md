# Fusioni Digital Menu - Native Android App

Production-ready native Android project for the Fusioni Digital Menu web application with full offline support, hardware back button navigation, safe area compliance, and automated GitHub Actions CI/CD pipeline.

## Project Structure
- `www/`: Web bundle containing `index.html`, `offline.html`, and `js/native-bridge.js`.
- `capacitor.config.ts`: Capacitor configuration.
- `android/`: Native Android Studio project (API 34/35 ready).
- `.github/workflows/build-android.yml`: Automated CI/CD pipeline to build APK & AAB.

## Getting Started Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Sync Web Code to Android Platform:**
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```
   Or run directly on an emulator/device:
   ```bash
   npx cap run android
   ```

## Automated GitHub Actions CI/CD

Push this folder to a GitHub repository on `main` or `master`.
- The pipeline will automatically install dependencies, sync Capacitor, compile with JDK 17, and build your debug APK.
- The compiled `.apk` will be available directly under **GitHub Actions > Workflow Run > Artifacts**.
