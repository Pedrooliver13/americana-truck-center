// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Models
import { PutUser } from 'models/users/users';

// Services
import { putUser } from 'services/users/putUsers';

export const usePutUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutUser) => putUser(data),

    onSuccess: () => {
      toast.success('Usuario atualizado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o usuário!');
    },
  });

  return mutation;
};
