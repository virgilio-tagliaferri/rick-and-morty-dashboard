import axiosClient from './axiosClient';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;

  origin: {
    name: string;
    url: string;
  };

  location: {
    name: string;
    url: string;
  };

  episode: string[];
}

export interface CharacterListResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export const fetchCharacters = async (
  page = 1,
  name = ''
): Promise<CharacterListResponse> => {
  const { data } = await axiosClient.get<CharacterListResponse>('/character', {
    params: { page, name },
  });
  return data;
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  const { data } = await axiosClient.get<Character>(`/character/${id}`);
  return data;
};
