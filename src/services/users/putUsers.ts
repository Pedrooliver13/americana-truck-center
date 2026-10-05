// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutUser } from 'models/users/users';

export const putUser = async (data: PutUser) => {
  try {
    await updateDoc(doc(db, 'users', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
