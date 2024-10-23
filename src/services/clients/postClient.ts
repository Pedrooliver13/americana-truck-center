// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostClient } from 'models/clients/clients';

export const postClient = async (data: PostClient) => {
  try {
    await addDoc(collection(db, 'clients'), { ...data, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
