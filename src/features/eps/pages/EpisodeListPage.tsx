// src/features/eps/pages/EpisodeListPage.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchEpisodes } from '../../../api/eps';
import type { EpisodeListResponse, Episode } from '../../../api/eps';

export default function EpisodeListPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<EpisodeListResponse>({
    queryKey: ['episodes', search, page],
    queryFn: () => fetchEpisodes(page, search),
    placeholderData: (prev) => prev,
  });

  const totalPages = data?.info.pages ?? 1;

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4 text-white'>Episodes</h1>

      {/* SEARCH */}
      <input
        type='text'
        placeholder='Search episodes...'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className='w-full max-w-sm mb-6 px-3 py-2 rounded bg-gray-800 text-gray-100 
                   placeholder-gray-400 border border-gray-700 
                   focus:outline-none focus:ring focus:ring-blue-500'
      />

      {/* LOADING / ERROR */}
      {isLoading && <p className='text-gray-300'>Loading...</p>}
      {isError && <p className='text-red-400'>Error loading episodes.</p>}

      {/* EPISODE GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data?.results?.map((ep: Episode) => (
          <Link
            key={ep.id}
            to={`/episodes/${ep.id}`}
            className='bg-gray-800 rounded-lg p-4 
                       hover:bg-gray-700 transition border border-gray-700'
          >
            <p className='text-lg font-semibold text-white'>{ep.episode}</p>
            <p className='text-gray-300'>{ep.name}</p>
            <p className='text-gray-400 text-sm'>Air date: {ep.air_date}</p>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <div className='flex items-center gap-4 mt-6'>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          Previous
        </button>

        <span className='text-gray-300'>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
