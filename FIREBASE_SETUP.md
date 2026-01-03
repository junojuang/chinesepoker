# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development) or **production mode** (with security rules)
4. Choose a location for your database

## Step 3: Get Your Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app (you can name it "Poker Card Game")
5. Copy the `firebaseConfig` object

## Step 4: Update Your Config File

Open `src/firebase/config.js` and replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
}
```

## Step 5: Set Up Firestore Security Rules (Recommended for Production)

In Firebase Console → Firestore Database → Rules, update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to leaderboard collection
    match /leaderboard/{document=**} {
      allow read: if true; // Anyone can read
      allow create: if true; // Anyone can create (for development)
      // For production, you might want to add authentication:
      // allow create: if request.auth != null;
    }
  }
}
```

## Step 6: Install Dependencies

```bash
npm install
```

## Step 7: Run Your App

```bash
npm run dev
```

## Security Notes

- For production, consider implementing Firebase Authentication
- Update Firestore security rules to require authentication for writes
- Consider rate limiting to prevent spam

## Collection Structure

The leaderboard uses a collection called `leaderboard` with documents containing:
- `playerName` (string)
- `score` (number)
- `reward` (number)
- `balance` (number)
- `timestamp` (Timestamp)

