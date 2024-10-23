// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deletePriceById } from 'services/prices/deletePrice';

export const useDeletePriceById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deletePriceById(id),

    onSuccess: () => {
      toast.success('Preço deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o preço!');
    },
  });

  return mutation;
};
