// Packages
import { db } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getByIdTask = async (id?: string) => {
  if (!id) return;

  try {
    const docRef = doc(db, 'tasks', id);
    const response = await getDoc(docRef);
    return response.data();
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};
