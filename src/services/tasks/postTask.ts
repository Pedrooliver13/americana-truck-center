// Packages
import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostTask } from 'models/tasks/postTasks';

export const postTask = async (data: PostTask) => {
  try {
    await addDoc(collection(db, 'tasks'), { ...data, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
