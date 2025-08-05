# Boardom - AI Kanban Workflow Tool

A kanban tool to keep your code on the path to success

## Development Setup

1. **Clone the repository and install dependencies:**
```bash
npm install
```

2. **Environment Variables:**
Copy the `.env` file and add your API keys:
- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID  
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key
- `VITE_RECAPTCHA_SITE_KEY`: Your reCAPTCHA site key

3. **Start development server:**
```bash
npm run dev
```

## Firebase Setup (for Production)

To enable the waitlist functionality in production, you need to configure Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General > Your apps
4. Click "Add app" and select "Web"
5. Register your app and copy the configuration object
5. In the Firebase Console, go to Firestore Database
6. Click "Create database" and choose "Start in test mode"
7. The waitlist will automatically create a `waitlist` collection when users sign up

## Netlify Deployment

For production deployment on Netlify:

1. **Environment Variables**: Set these in Netlify Dashboard > Site Settings > Environment Variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `VITE_RECAPTCHA_SITE_KEY`

2. **Firebase Service Account**: 
   - Go to Firebase Console > Project Settings > Service Accounts
   - Generate a new private key
   - Use the values from the downloaded JSON file for the Netlify environment variables

## Development

```bash
npm install
npm run dev
```

**Note**: In development mode, the waitlist form will simulate success without actually saving to Firebase. This allows you to test the UI without needing Firebase credentials.

## Deployment

This project is configured for deployment to Netlify. The build command is `npm run build` and the publish directory is `dist`.

## Features

- AI-powered task generation using Google Gemini  
- Kanban workflow visualization (coming soon)
- Email waitlist with Firebase Firestore
- Responsive design with custom CSS
- reCAPTCHA v3 protection for forms
