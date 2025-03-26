// Models
import { ETaskStatus } from 'models/tasks/tasks';

export interface DashboardChart {
  categories: Array<string>;
  series: Array<{
    data: Array<number>;
    name: ETaskStatus.INVOICE | ETaskStatus.PAID_OFF | ETaskStatus.RECEIVABLE;
  }>;
}
