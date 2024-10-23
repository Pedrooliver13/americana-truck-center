// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PutClient } from 'models/clients/clients';

// Services
import { putClient } from 'services/clients/putClient';

export const usePutClient = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutClient) => putClient(data),

    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/clients');

      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.refetchQueries({ queryKey: ['clients'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o cliente!');
    },
  });

  return mutation;
};
