// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Models
import { ETaskServiceStatus, ETaskStatus } from 'models/tasks/tasks';

// Services
import { putBatchTask } from 'services/tasks/putBatchTasks';

export const usePutBatchTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      ids,
      status,
      serviceStatus,
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
    }) => putBatchTask(ids, { status, serviceStatus }),

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
