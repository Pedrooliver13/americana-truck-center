// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteReportById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'reports', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
