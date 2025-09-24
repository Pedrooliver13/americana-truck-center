// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Models
import { PutTask } from 'models/tasks/tasks';

// Services
import { putTask } from 'services/tasks/putTasks';

export const usePutTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutTask) => putTask(data),

    onSuccess: () => {
      toast.success('Serviço atualizado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      navigate('/tasks');
    },

    onError: () => {
      toast.error('Não foi possível atualizar o serviço!');
    },
  });

  return mutation;
};
