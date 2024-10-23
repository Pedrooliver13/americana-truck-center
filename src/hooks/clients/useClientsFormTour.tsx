// Packages
import { useRef, useState } from 'react';

export const useClientsFormTour = () => {
  const isOpenTourState = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps = [
    {
      title: 'Preencha o formulário!',
      description:
        'Preencha o formulário com as informações do cliente que deseja cadastrar.',
      target: () => ref1.current,
    },
    {
      title: 'Clique em salvar!',
      description:
        'Ao clicar nesse botão, você irá salvar ou atualizar as informações do cliente.',
      target: () => ref2.current,
    },
  ];

  return {
    isOpenTourState,
    steps,
    ref1,
    ref2,
  };
};
