import * as admin from 'firebase-admin';

const adminConfig: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: 'https://xxxxx.firebaseio.com',
});

export { admin };
