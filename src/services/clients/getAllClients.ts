// Packages
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAllClients = async () => {
  try {
    const query = await getDocs(collection(db, 'clients'));

    const response = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return response;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};
