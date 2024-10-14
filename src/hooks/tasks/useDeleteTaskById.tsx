// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deleteTaskById } from 'services/tasks/deleteTask';

export const useDeleteByIdTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteTaskById(id),

    onSuccess: () => {
      toast.success('Serviço deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.refetchQueries({ queryKey: ['tasks'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o serviço!');
    },
  });

  return mutation;
};
