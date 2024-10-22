// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PostPrice } from 'models/prices/prices';

// Services
import { postPrice } from 'services/prices/postPrice';

export const usePostPrice = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostPrice) => postPrice(data),

    onSuccess: () => {
      toast.success('Preço cadastrado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/prices');

      queryClient.invalidateQueries({ queryKey: ['prices'] });
      queryClient.refetchQueries({ queryKey: ['prices'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o preço!');
    },
  });

  return mutation;
};
