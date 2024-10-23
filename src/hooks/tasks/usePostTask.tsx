// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PostTask } from 'models/tasks/tasks';

// Services
import { postTask } from 'services/tasks/postTask';

export const usePostTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostTask) => postTask(data),

    onSuccess: () => {
      toast.success('Serviço cadastrado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/tasks');

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o serviço!');
    },
  });

  return mutation;
};
