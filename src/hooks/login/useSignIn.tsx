// Packages
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Services
import { singInWithEmailAndPassword } from 'services/auth/auth';

export const useSignIn = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      singInWithEmailAndPassword(data?.email, data?.password),

    onSuccess: () => {
      toast.success('Bem-vindo!', {
        position: 'top-right',
        autoClose: 1200,
      });

      navigate('/');
    },

    onError: () => {
      toast.error('E-mail ou senha inválidos!');
    },
  });

  return mutation;
};
