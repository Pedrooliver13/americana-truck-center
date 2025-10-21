// Packages
import { db } from 'config/firebase';
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';

// Models
import { ETaskServiceStatus, ETaskStatus } from 'models/tasks/tasks';

interface PutBatchTaskBody {
  status?: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  serviceStatus?:
    | ETaskServiceStatus.PENDING
    | ETaskServiceStatus.COMPLETED
    | ETaskServiceStatus.CANCELED;
}

export const putBatchTask = async (
  ids: Array<string>,
  body: PutBatchTaskBody
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
          status: body?.status ?? document?.data()?.status,
          serviceStatus: body?.serviceStatus ?? document?.data()?.serviceStatus,
        });
      });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
