// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PostReport } from 'models/reports/reports';

// Services
import { postReport } from 'services/reports/postReport';

export const usePostReport = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostReport) => postReport(data),

    onSuccess: () => {
      toast.success('Laudo cadastrado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/reports');

      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o laudo!');
    },
  });

  return mutation;
};
