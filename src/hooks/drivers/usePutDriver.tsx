// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PutDriver } from 'models/drivers/drivers';

// Services
import { putDriver } from 'services/drivers/putDriver';

export const usePutDriver = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutDriver) => putDriver(data),

    onSuccess: () => {
      toast.success('Motorista atualizado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/drivers');

      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o motorista!');
    },
  });

  return mutation;
};
