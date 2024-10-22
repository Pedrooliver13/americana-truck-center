// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutPrice } from 'models/prices/prices';

export const putPrice = async (data: PutPrice) => {
  try {
    await updateDoc(doc(db, 'prices', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
