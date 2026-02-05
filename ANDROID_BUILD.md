# Android Build Instructions

## Quick Build Guide

### 1. Build the Web App
```bash
npm run build
```

### 2. Sync to Android
```bash
npx cap sync android
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Build APK
In Android Studio:
- Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### 5. Install on Device
- Connect phone via USB with debugging enabled
- Click **Run** (green play button) in Android Studio

---

## Configuration Details

### App Details
- **App Name**: Vidyon Driver
- **Package ID**: com.vidyon.driver
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Latest)

### Permissions Required
- ✅ Internet access
- ✅ GPS/Location (Fine & Coarse)

### Features Enabled
- ✅ HTTPS scheme for web content
- ✅ Mixed content allowed (for dev)
- ✅ Web debugging enabled
- ✅ GPS location tracking
- ✅ Supabase real-time sync

---

## Troubleshooting

### "Configuration needed" error
Run: `npx cap sync android`

### Build fails
1. Clean project: In Android Studio → **Build** → **Clean Project**
2. Rebuild: **Build** → **Rebuild Project**

### GPS not working
- Must test on **real device**, not emulator
- Grant location permissions when prompted

### App crashes on launch
- Check `.env` file has correct Supabase credentials
- Run `npm run build` again

---

## One-Command Build
```bash
npm run build && npx cap sync android && npx cap open android
```

Then just click the **Run** button in Android Studio!
