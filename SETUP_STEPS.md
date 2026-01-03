# Quick Setup Steps

## Step 1: Get Your Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **"Your apps"** section
5. Click the **Web icon** (`</>`) to add a web app (or use existing one)
6. Register your app (name it "Poker Card Game" or anything you want)
7. Copy the `firebaseConfig` object - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## Step 2: Update config.js

Open `src/firebase/config.js` and replace the placeholder values with your actual config values.

## Step 3: Verify Collection Name

Make sure your Firestore collection is named exactly: **`leaderboard`** (lowercase)

If you named it something else, either:
- Option A: Rename it to `leaderboard` in Firebase Console
- Option B: Change `LEADERBOARD_COLLECTION` in `src/firebase/leaderboard.js`

## Step 4: Set Up Security Rules

In Firebase Console → Firestore Database → Rules tab, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{document=**} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

Click **Publish** to save the rules.

## Step 5: Install Dependencies & Run

```bash
npm install
npm run dev
```

## Step 6: Test

1. Play a game
2. When you finish, enter your name in the notification modal
3. Click "保存并关闭 (Save & Close)"
4. Check the leaderboard - your score should appear!

## Troubleshooting

- **Error: "Permission denied"** → Check your Firestore security rules
- **Error: "Collection not found"** → Make sure collection is named `leaderboard`
- **Scores not showing** → Check browser console for errors (F12)

