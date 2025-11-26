// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Models
import { PutTask } from 'models/tasks/tasks';

// Services
import { putTask } from 'services/tasks/putTasks';

export const usePutTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useGlobalContext();

  const mutation = useMutation({
    mutationFn: (data: PutTask) =>
      putTask({ ...data, updatedBy: currentUser?.email ?? '' }),

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
