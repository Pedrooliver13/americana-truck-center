// Packages
import { useRef, useState } from 'react';

export const useClientsTableTour = () => {
  const isOpenTourState = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const steps = [
    {
      title: 'Adicionar Cliente',
      description:
        'Ao clicar nesse botão, você será redirecionado para a tela de cadastro de cliente onde poderá cadastra-los.',
      target: () => ref1.current,
    },
    {
      title: 'Pesquisar!',
      description:
        'Campo de pesquisa para facilitar a busca de um cliente específico.',
      target: () => ref2.current,
    },
    {
      title: 'Gerar EXCEL!',
      description:
        'Ao clicar aqui, você irá gerar um arquivo excel com as informações da tabela.',
      target: () => ref3.current,
    },
    {
      title: 'Gerar PDF!',
      description:
        'Ao clicar aqui, você irá gerar um arquivo PDF com as informações da tabela.',
      target: () => ref4.current,
    },
    {
      title: 'Gerenciar Colunas!',
      description: 'Aqui você pode escolher quais colunas vão aparecer.',
      target: () => ref5.current,
    },
    {
      title: 'Tabela de Clientes',
      description: 'Aqui você pode visualizar todos os clientes cadastrados.',
      target: () => ref6.current,
    },
  ];

  return {
    isOpenTourState,
    steps,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
  };
};
