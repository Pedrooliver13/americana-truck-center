// Packages
import { Timestamp } from 'firebase/firestore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Models
import { ETaskServiceStatus, ETaskStatus } from 'models/tasks/tasks';

// Services
import { putBatchTask } from 'services/tasks/putBatchTasks';

export const usePutBatchTask = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useGlobalContext();

  const mutation = useMutation({
    mutationFn: ({
      ids,
      status,
      serviceStatus,
      createdAt,
    }: {
      ids: Array<string>;
      status?:
        | ETaskStatus.INVOICE
        | ETaskStatus.PAID_OFF
        | ETaskStatus.RECEIVABLE;
      serviceStatus?:
        | ETaskServiceStatus.PENDING
        | ETaskServiceStatus.COMPLETED
        | ETaskServiceStatus.CANCELED;
      createdAt?: Timestamp | string | Date;
      updatedBy?: string;
    }) =>
      putBatchTask(ids, {
        status,
        serviceStatus,
        createdAt,
        updatedBy: currentUser?.email ?? '',
      }),

    onSuccess: () => {
      toast.success('Serviços atualizado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o serviço!');
    },
  });

  return mutation;
};
