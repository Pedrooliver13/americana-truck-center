export interface PokemonType {
  name: string;
  url: string;
}

export type GetAllPokemonResponse = {
  results: Array<PokemonType>;
};
