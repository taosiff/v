# Firebase Setup Instructions

## Setting Up Your Firebase Database

To enable real-time vote tracking, you need to set up a Firebase Realtime Database:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### Step 2: Create a Realtime Database

1. In your Firebase project, click "Realtime Database" in the left menu
2. Click "Create Database"
3. Choose a location close to your users
4. Start in **Test Mode** for now (you can add security rules later)

### Step 3: Get Your Firebase Configuration

1. Click on the gear icon next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Team Poll")
6. Copy the `firebaseConfig` object

### Step 4: Update poll.js

Replace the `firebaseConfig` object in `poll.js` (lines 2-10) with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 5: Initialize Database (Optional)

You can manually set initial vote counts in Firebase Console:
1. Go to Realtime Database
2. Click the "+" icon to add data
3. Create this structure:
```
votes
  ├── teamA: 0
  └── teamB: 0
```

### Step 6: Security Rules (Recommended)

Once testing is complete, update your database rules for better security:

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true,
      "teamA": {
        ".validate": "newData.isNumber()"
      },
      "teamB": {
        ".validate": "newData.isNumber()"
      }
    }
  }
}
```

## Features

✅ **Real-time vote tracking** - Votes are saved to Firebase and sync across all users
✅ **One vote per user** - Users can only vote once (tracked via localStorage)
✅ **Live updates** - Vote counts update in real-time for all viewers
✅ **Persistent data** - Votes are saved even after page refresh

## How It Works

- When a user votes, the vote is sent to Firebase Realtime Database
- The app listens for changes and updates the vote count automatically
- `localStorage` prevents users from voting multiple times on the same browser
- Both teams can receive votes, but voting for TEAMNVD shows a playful message

## Note

The current Firebase config in `poll.js` is a placeholder. You **must** replace it with your own Firebase project credentials for the app to work properly.

