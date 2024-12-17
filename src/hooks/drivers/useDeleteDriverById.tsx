// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deleteDriverById } from 'services/drivers/deleteDriver';

export const useDeleteDriverById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteDriverById(id),

    onSuccess: () => {
      toast.success('Motorista deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar um motorista!');
    },
  });

  return mutation;
};
