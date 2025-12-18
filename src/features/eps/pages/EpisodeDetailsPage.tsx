// src/features/eps/pages/EpisodeDetailsPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchEpisodeById } from '../../../api/eps';
import type { Episode } from '../../../api/eps';

export default function EpisodeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const episodeId = Number(id);

  const { data, isLoading, isError } = useQuery<Episode>({
    queryKey: ['episode', episodeId],
    queryFn: () => fetchEpisodeById(episodeId),
    enabled: !Number.isNaN(episodeId),
  });

  if (isLoading) {
    return <p className='text-gray-300'>Loading episode...</p>;
  }

  if (isError || !data) {
    return <p className='text-red-400'>Error loading episode.</p>;
  }

  const episode = data;

  return (
    <div className='w-full'>
      {/* BACK LINK */}
      <Link
        to='/episodes'
        className='inline-block mb-4 text-blue-400 hover:underline'
      >
        ← Back to episodes
      </Link>

      {/* EPISODE CARD */}
      <div className='bg-gray-800 border border-gray-700 rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-white mb-2'>
          {episode.episode}
        </h1>
        <p className='text-xl text-gray-200 mb-4'>{episode.name}</p>

        <p className='text-gray-300'>
          <span className='font-semibold text-gray-200'>Air date:</span>{' '}
          {episode.air_date}
        </p>
      </div>

      {/* CHARACTERS */}
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold text-white mb-4'>Characters</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {episode.characters.map((characterUrl) => {
            const characterId = characterUrl.split('/').pop();

            return (
              <Link
                key={characterUrl}
                to={`/characters/${characterId}`}
                className='bg-gray-800 border border-gray-700 rounded p-3 
                           hover:bg-gray-700 transition text-gray-200'
              >
                Character {characterId}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
