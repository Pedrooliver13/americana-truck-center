// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteDriverById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'drivers', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
