// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deleteClientById } from 'services/clients/deleteClient';

export const useDeleteClientById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteClientById(id),

    onSuccess: () => {
      toast.success('Cliente deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o cliente!');
    },
  });

  return mutation;
};
