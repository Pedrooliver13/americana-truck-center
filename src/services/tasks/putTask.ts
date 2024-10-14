// Packages
import { db } from 'config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Models
import { PostTask } from 'models/tasks/postTasks';

interface PutTask extends PostTask {
  id: string;
}

export const putTask = async (id: string, data: PutTask) => {
  try {
    const userDoc = doc(db, 'tasks', id);
    await updateDoc(userDoc, data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
