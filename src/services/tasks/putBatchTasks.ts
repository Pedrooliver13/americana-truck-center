// Packages
import { db } from 'config/firebase';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

// Models
import { ETaskServiceStatus, ETaskStatus } from 'models/tasks/tasks';

interface PutBatchTaskBody {
  status?: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  serviceStatus?:
    | ETaskServiceStatus.PENDING
    | ETaskServiceStatus.COMPLETED
    | ETaskServiceStatus.CANCELED;
  createdAt?: Timestamp | string | Date;
  updatedBy?: string;
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
          createdAt: body?.createdAt ?? document?.data()?.createdAt,
          updatedBy: body?.updatedBy ?? document?.data()?.updatedBy,
        });
      });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
