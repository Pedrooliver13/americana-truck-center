// Services
import { api } from 'services/axios';

// Models
import { PokemonType, GetAllPokemonResponse } from 'models/tasks/pokemon';

export const getAllPokemon = async (): Promise<Array<PokemonType>> => {
  try {
    const response = await api.get<GetAllPokemonResponse>('/pokemon');
    return response.data?.results;
  } catch (error) {
    throw new Error();
  }
};
