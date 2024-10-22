// Packages
import { useRef, useState } from 'react';
import { TourStepProps } from 'antd';

export const usePricesFormTour = () => {
  const isOpenTourState = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps = [
    {
      title: 'Formulário de Preços',
      description: 'Preencha os campos para adicionar um novo preço.',
      target: () => ref1.current,
    },
    {
      title: 'Finalizar Cadastro',
      description: 'Clique aqui para finalizar o cadastro.',
      target: () => ref2.current,
    },
  ] as TourStepProps[];

  return {
    isOpenTourState,
    steps,
    ref1,
    ref2,
  };
};
