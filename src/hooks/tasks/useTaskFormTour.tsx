// Packages
import { useRef, useState } from 'react';
import { TourStepProps } from 'antd';

export const useTaskFormTour = () => {
  const isOpenTourState = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps = [
    {
      title: 'Formulário de Cadastro de Serviços',
      description:
        'Preencha esses campos para ser possível gerar um recibo do serviço.',
      placement: 'right',
      target: () => ref1.current,
    },
    {
      title: 'Preço do Serviço',
      description: 'Informe o serviço que será prestado e ele aparecerá aqui.',
      target: () => ref2.current,
    },
    {
      title: 'Finalizar Cadastro',
      description: 'Clique em "Salvar" para finalizar o cadastro.',
      target: () => ref3.current,
    },
  ] as TourStepProps[];

  return {
    isOpenTourState,
    steps,
    ref1,
    ref2,
    ref3,
  };
};
