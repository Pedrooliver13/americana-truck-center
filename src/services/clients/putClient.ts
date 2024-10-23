// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutClient } from 'models/clients/clients';

export const putClient = async (data: PutClient) => {
  try {
    await updateDoc(doc(db, 'clients', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
