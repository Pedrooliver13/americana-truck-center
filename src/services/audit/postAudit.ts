// Packages
import { dbAudit } from 'config/audit-firebase';
import { addDoc, collection } from 'firebase/firestore';

// Models
import { PostAudit } from 'models/audits/audits';

export const postAudit = async (data: PostAudit) => {
  try {
    await addDoc(collection(dbAudit, 'audits'), {
      ...data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding audit: ', error);
  }
};
