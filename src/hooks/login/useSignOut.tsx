// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Services
import { singOut } from 'services/auth/auth';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => singOut(),

    onSuccess: () => {
      toast.success('Sessão encerrada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['users'] });

      navigate('/login');
    },

    onError: () => {
      toast.error('Erro ao tentar encerrar a sessão!');
    },
  });

  return mutation;
};
