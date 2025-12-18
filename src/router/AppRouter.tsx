// src/router/AppRouter.tsx

import { Routes, Route, Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/chrs';
import { fetchEpisodes } from '../api/eps';

import CharacterListPage from '../features/chrs/pages/CharacterListPage';
import CharacterDetailsPage from '../features/chrs/pages/CharacterDetailsPage';
import EpisodeListPage from '../features/eps/pages/EpisodeListPage';
import EpisodeDetailsPage from '../features/eps/pages/EpisodeDetailsPage';

export default function AppRouter() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-100'>
      {/* NAVIGATION BAR */}
      <nav className='bg-gray-800 text-white px-6 py-4 shadow flex items-center gap-6'>
        <Link to='/' className='hover:text-blue-400 transition'>
          Home
        </Link>
        <Link to='/characters' className='hover:text-blue-400 transition'>
          Characters
        </Link>
        <Link to='/episodes' className='hover:text-blue-400 transition'>
          Episodes
        </Link>
      </nav>

      {/* MAIN CONTENT */}
      <div className='p-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/characters' element={<CharacterListPage />} />
          <Route path='/characters/:id' element={<CharacterDetailsPage />} />

          <Route path='/episodes' element={<EpisodeListPage />} />
          <Route path='/episodes/:id' element={<EpisodeDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

function HomePage() {
  const charactersQuery = useQuery({
    queryKey: ['characters-count'],
    queryFn: () => fetchCharacters(1, ''),
  });

  const episodesQuery = useQuery({
    queryKey: ['episodes-count'],
    queryFn: () => fetchEpisodes(1, ''),
  });

  const charactersCount = charactersQuery.data?.info.count;
  const episodesCount = episodesQuery.data?.info.count;

  return (
    <div className='space-y-8'>
      {/* HERO */}
      <div>
        <h1 className='text-4xl font-bold text-white mb-3'>
          Rick and Morty Dashboard
        </h1>
        <p className='text-gray-300 max-w-xl'>
          Explore characters and episodes from the Rick and Morty universe.
          Search, browse, and navigate between related entities.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <Link
          to='/characters'
          className='bg-gray-800 border border-gray-700 rounded-lg p-6 
                     hover:bg-gray-700 transition'
        >
          <h2 className='text-2xl font-semibold text-white mb-2'>Characters</h2>
          <p className='text-gray-300 mb-2'>
            Browse all characters and view detailed profiles.
          </p>

          {charactersQuery.isLoading && (
            <p className='text-gray-400 text-sm'>Loading count…</p>
          )}

          {charactersCount && (
            <p className='text-gray-400 text-sm'>
              Total characters:{' '}
              <span className='text-white font-semibold'>
                {charactersCount}
              </span>
            </p>
          )}
        </Link>

        <Link
          to='/episodes'
          className='bg-gray-800 border border-gray-700 rounded-lg p-6 
                     hover:bg-gray-700 transition'
        >
          <h2 className='text-2xl font-semibold text-white mb-2'>Episodes</h2>
          <p className='text-gray-300 mb-2'>
            Explore episodes and discover character appearances.
          </p>

          {episodesQuery.isLoading && (
            <p className='text-gray-400 text-sm'>Loading count…</p>
          )}

          {episodesCount && (
            <p className='text-gray-400 text-sm'>
              Total episodes:{' '}
              <span className='text-white font-semibold'>{episodesCount}</span>
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
