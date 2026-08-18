// Packages
import { Timestamp } from 'firebase/firestore';

export interface Audit {
  description: string;
  content: string;
  createdAt: Timestamp;
}

export interface PostAudit {
  description: string;
  content: string;
}
