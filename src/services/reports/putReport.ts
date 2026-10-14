// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutReport } from 'models/reports/reports';

export const putReport = async (data: PutReport) => {
  try {
    await updateDoc(doc(db, 'reports', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};
