// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutDriver } from 'models/drivers/drivers';

export const putDriver = async (data: PutDriver) => {
  try {
    await updateDoc(doc(db, 'drivers', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
