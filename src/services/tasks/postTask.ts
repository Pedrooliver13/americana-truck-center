// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostTask } from 'models/tasks/tasks';

export const postTask = async (data: PostTask) => {
  try {
    await addDoc(collection(db, 'tasks'), { ...data, createdAt: new Date() });
  } catch (error) {
    throw new Error('Error adding document: ' + error);
  }
};
