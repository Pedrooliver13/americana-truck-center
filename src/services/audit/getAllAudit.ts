// Packages
import { dbAudit } from 'config/audit-firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAllAudits = async () => {
  try {
    const query = await getDocs(collection(dbAudit, 'audits'));

    const response = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return response;
  } catch (error) {
    console.error('Error getting audits: ', error);
  }
};
