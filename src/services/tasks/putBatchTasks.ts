// Packages
import { db } from 'config/firebase';
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';

// Models
import { ETaskStatus } from 'models/tasks/tasks';

export const putBatchTask = async (
  ids: Array<string>,
  status: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE
) => {
  try {
    const snapshot = await getDocs(collection(db, 'tasks'));

    if (!Array.isArray(snapshot.docs)) {
      throw new Error();
    }

    snapshot.docs
      .filter((doc) => ids.includes(doc?.id))
      .forEach(async (document) => {
        await updateDoc(doc(db, 'tasks', document?.id), {
          ...document.data,
          status,
        });
      });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
