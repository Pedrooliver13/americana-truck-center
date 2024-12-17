// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostDriver } from 'models/drivers/drivers';

export const postDriver = async (data: PostDriver) => {
  try {
    await addDoc(collection(db, 'drivers'), { ...data, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
