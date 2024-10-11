const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

// Firebase Admin SDK (used for server-side operations)
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-project-id>.firebaseio.com'
});

// Firebase client SDK (used for client-side operations, like authentication)
const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>", //might not need
  messagingSenderId: "<your-sender-id>",
  appId: "<your-app-id>"
};

firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, db, firebase };