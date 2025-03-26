// Packages
import { db } from 'config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

// Models
import { PutTask } from 'models/tasks/tasks';

export const putTask = async (data: PutTask) => {
  try {
    await updateDoc(doc(db, 'tasks', data?.id), { ...data });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
