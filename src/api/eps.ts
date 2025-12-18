import axiosClient from './axiosClient';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EpisodeListResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

export const fetchEpisodes = async (
  page = 1,
  name = ''
): Promise<EpisodeListResponse> => {
  const { data } = await axiosClient.get<EpisodeListResponse>('/episode', {
    params: { page, name },
  });
  return data;
};

export const fetchEpisodeById = async (id: number): Promise<Episode> => {
  const { data } = await axiosClient.get<Episode>(`/episode/${id}`);
  return data;
};
