// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteClientById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'clients', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
