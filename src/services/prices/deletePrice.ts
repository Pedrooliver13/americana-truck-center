// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deletePriceById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'prices', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
