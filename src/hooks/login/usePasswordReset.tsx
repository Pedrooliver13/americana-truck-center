// Packages
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Services
import { passwordReset } from 'services/auth/auth';

export const usePasswordReset = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => passwordReset(data?.email),

    onSuccess: () => {
      toast.success('Verifique seu e-mail para redefir sua senha!', {
        autoClose: 5000,
      });

      navigate('/login');
    },

    onError: () => {
      toast.error('Falha ao tentar redefinir a senha!');
    },
  });

  return mutation;
};
