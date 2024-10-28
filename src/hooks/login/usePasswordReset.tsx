// Packages
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Services
import { passwordReset } from 'services/auth/auth';

interface PasswordResetProps {
  notNavigate?: boolean;
}

export const usePasswordReset = (props?: PasswordResetProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => passwordReset(data?.email),

    onSuccess: () => {
      toast.success('Verifique seu e-mail para redefir sua senha!', {
        autoClose: 5000,
      });

      if (!props?.notNavigate) {
        navigate('/login');
      }
    },

    onError: () => {
      toast.error('Falha ao tentar redefinir a senha!');
    },
  });

  return mutation;
};
