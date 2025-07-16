# Boardom - AI Kanban Workflow Tool

A kanban tool to keep your vibe code on the path to success

## Firebase Setup

To enable the waitlist functionality, you need to configure Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General > Your apps
4. Click "Add app" and select "Web"
5. Register your app and copy the configuration object
6. Replace the placeholder values in `firebaseConfig.ts` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

7. In the Firebase Console, go to Firestore Database
8. Click "Create database" and choose "Start in test mode"
9. The waitlist will automatically create a `waitlist` collection when users sign up

## Development

```bash
npm install
npm run dev
```

## Features

- AI-powered task generation using Google Gemini
- Kanban workflow visualization
- Email waitlist with Firebase Firestore
- Responsive design with Tailwind CSS
