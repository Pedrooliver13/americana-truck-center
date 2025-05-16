// Packages
import { db } from 'config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteBatchTaskByIds = async (ids: Array<string>) => {
  try {
    ids.forEach(async (documentId) => {
      await deleteDoc(doc(db, 'tasks', documentId));
    });
  } catch {
    throw new Error('Error deleting document');
  }
};
