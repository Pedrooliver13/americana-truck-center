// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostPrice } from 'models/prices/prices';

export const postPrice = async (data: PostPrice) => {
  try {
    await addDoc(collection(db, 'prices'), { ...data, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
