// Packages
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseAuditConfig = {
  apiKey: import.meta.env.VITE_AUDIT_API_KEY,
  authDomain: import.meta.env.VITE_AUDIT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_AUDIT_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AUDIT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_AUDIT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_AUDIT_APP_ID,
  measurementId: import.meta.env.VITE_AUDIT_MEASUREMENT_ID,
};

const appAuditFirebase = initializeApp(firebaseAuditConfig, 'audit-firebase');
const dbAudit = getFirestore(appAuditFirebase);

export { appAuditFirebase, dbAudit };
