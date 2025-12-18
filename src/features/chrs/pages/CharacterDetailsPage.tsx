// src/features/chrs/pages/CharacterDetailsPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchCharacterById } from '../../../api/chrs';
import type { Character } from '../../../api/chrs';

export default function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <p className='text-gray-300'>Loading character...</p>;
  }

  if (isError || !data) {
    return <p className='text-red-400'>Error loading character.</p>;
  }

  const character = data;

  const statusColor =
    character.status === 'Alive'
      ? 'bg-green-600'
      : character.status === 'Dead'
      ? 'bg-red-600'
      : 'bg-gray-500';

  return (
    <div className='w-full'>
      {/* BACK LINK */}
      <Link
        to='/characters'
        className='inline-block mb-4 text-blue-400 hover:underline'
      >
        ← Back to characters
      </Link>

      {/* MAIN CARD */}
      <div className='bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col sm:flex-row gap-6'>
        {/* IMAGE */}
        <img
          src={character.image}
          alt={character.name}
          className='w-40 h-40 rounded object-cover sm:self-start'
        />

        {/* INFO */}
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            {character.name}
          </h1>

          <div className='space-y-2 text-gray-300'>
            <p className='flex items-center gap-2'>
              <span className='font-semibold text-gray-200'>Status:</span>
              <span
                className={`px-2 py-1 rounded text-sm text-white ${statusColor}`}
              >
                {character.status}
              </span>
            </p>
            <p>
              <span className='font-semibold text-gray-200'>Species:</span>{' '}
              {character.species}
            </p>
            {character.type && (
              <p>
                <span className='font-semibold text-gray-200'>Type:</span>{' '}
                {character.type}
              </p>
            )}
            <p>
              <span className='font-semibold text-gray-200'>Gender:</span>{' '}
              {character.gender}
            </p>
            <p>
              <span className='font-semibold text-gray-200'>Origin:</span>{' '}
              {character.origin.name}
            </p>
            <p>
              <span className='font-semibold text-gray-200'>Location:</span>{' '}
              {character.location.name}
            </p>
          </div>
        </div>
      </div>

      {/* EPISODES */}
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold text-white mb-4'>Episodes</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {character.episode.map((episodeUrl) => {
            const episodeId = episodeUrl.split('/').pop();

            return (
              <Link
                key={episodeUrl}
                to={`/episodes/${episodeId}`}
                className='bg-gray-800 border border-gray-700 rounded p-3 
                           hover:bg-gray-700 transition text-gray-200'
              >
                Episode {episodeId}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
