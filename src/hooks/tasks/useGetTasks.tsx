// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { getAllPokemon } from 'services/tasks/getAllTasks';

// Models
import { PokemonType } from 'models/tasks/pokemon';

export const useGetTasks = () => {
  const response = useQuery<Array<PokemonType>>({
    queryKey: ['tasks'],
    queryFn: () => getAllPokemon(),
    staleTime: 1000 * 60 * 5,
  });

  return response;
};
