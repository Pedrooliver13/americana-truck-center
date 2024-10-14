// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteTaskById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
