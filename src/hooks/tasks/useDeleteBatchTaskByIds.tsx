// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deleteBatchTaskByIds } from 'services/tasks/deleteBatchTasks';

export const useDeleteBatchTaskByIds = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (ids: Array<string>) => deleteBatchTaskByIds(ids),

    onSuccess: () => {
      toast.success('Serviço deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },

    onError: () => {
      toast.error('Não foi possível deletar o serviço!');
    },
  });

  return mutation;
};
