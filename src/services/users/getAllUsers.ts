// Packages
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAllUsers = async () => {
  try {
    const query = await getDocs(collection(db, 'users'));

    const response = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return response;
  } catch (error) {
    console.error('Error getting users: ', error);
  }
};
