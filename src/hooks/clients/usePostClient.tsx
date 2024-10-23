// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PostClient } from 'models/clients/clients';

// Services
import { postClient } from 'services/clients/postClient';

export const usePostClient = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostClient) => postClient(data),

    onSuccess: () => {
      toast.success('Cliente cadastrado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/clients');

      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o cliente!');
    },
  });

  return mutation;
};
