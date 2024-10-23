// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PutPrice } from 'models/prices/prices';

// Services
import { putPrice } from 'services/prices/putPrice';

export const usePutPrice = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutPrice) => putPrice(data),

    onSuccess: () => {
      toast.success('Preço atualizado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/prices');

      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o preço!');
    },
  });

  return mutation;
};
