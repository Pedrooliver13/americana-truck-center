// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostReport } from 'models/reports/reports';

export const postReport = async (data: PostReport) => {
  try {
    await addDoc(collection(db, 'reports'), { ...data, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};
