// Packages
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAllReports = async () => {
  try {
    const query = await getDocs(collection(db, 'reports'));

    const response = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return response;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw new Error('Error getting documents');
  }
};
