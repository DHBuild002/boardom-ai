# Boardom - AI Kanban Workflow Tool

A kanban tool to keep your vibe code on the path to success

## Firebase Setup

To enable the waitlist functionality, you need to configure Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General > Your apps
4. Click "Add app" and select "Web"
5. Register your app and copy the configuration object
6. Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
```

7. Add your Gemini API key to the same `.env` file:

```env
GEMINI_API_KEY=your-gemini-api-key
```

8. In the Firebase Console, go to Firestore Database
9. Click "Create database" and choose "Start in test mode"
10. The waitlist will automatically create a `waitlist` collection when users sign up

## Development

```bash
npm install
npm run dev
```

## Deployment

This project is configured for deployment to Netlify. The build command is `npm run build` and the publish directory is `dist`.

## Features

- AI-powered task generation using Google Gemini
- Kanban workflow visualization
- Email waitlist with Firebase Firestore
- Responsive design with Tailwind CSS
