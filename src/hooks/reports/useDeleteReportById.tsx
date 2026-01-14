// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Services
import { deleteReportById } from 'services/reports/deleteReport';

export const useDeleteReportById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteReportById(id),

    onSuccess: () => {
      toast.success('Laudo deletado com sucesso!', {
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },

    onError: () => {
      toast.error('Não foi possível cadastrar o Laudo!');
    },
  });

  return mutation;
};
