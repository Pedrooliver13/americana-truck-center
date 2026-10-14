// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Models
import { PutReport } from 'models/reports/reports';

// Services
import { putReport } from 'services/reports/putReport';

export const usePutReport = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PutReport) => putReport(data),

    onSuccess: () => {
      toast.success('Relatório atualizado com sucesso!', {
        autoClose: 5000,
      });

      navigate('/reports');

      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },

    onError: () => {
      toast.error('Não foi possível atualizar o relatório!');
    },
  });

  return mutation;
};
