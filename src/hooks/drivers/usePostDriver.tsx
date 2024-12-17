// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PostDriver } from 'models/drivers/drivers';

// Services
import { postDriver } from 'services/drivers/postDriver';

export const usePostDriver = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostDriver) => postDriver(data),

    onSuccess: () => {
      toast.success('Motorista cadastrado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/drivers');

      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o motorista!');
    },
  });

  return mutation;
};
