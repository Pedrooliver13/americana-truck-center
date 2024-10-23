// Packages
import { db } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getByIdPrice = async (id?: string) => {
  if (!id) return;

  try {
    const docRef = doc(db, 'prices', id);
    const response = await getDoc(docRef);
    return response.data();
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};
