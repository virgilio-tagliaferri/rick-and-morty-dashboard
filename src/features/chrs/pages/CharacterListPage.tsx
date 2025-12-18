// src/features/chrs/pages/CharacterListPage.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchCharacters } from '../../../api/chrs';
import type { CharacterListResponse, Character } from '../../../api/chrs';

export default function CharacterListPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<CharacterListResponse>({
    queryKey: ['characters', search, page],
    queryFn: () => fetchCharacters(page, search),
    placeholderData: (prev) => prev, // React Query v5 replacement for keepPreviousData
  });

  const totalPages = data?.info.pages ?? 1;

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4 text-white'>Characters</h1>

      {/* SEARCH BAR */}
      <input
        type='text'
        placeholder='Search characters...'
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
      {isError && <p className='text-red-400'>Error loading characters.</p>}

      {/* CHARACTER GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data?.results?.map((char: Character) => (
          <Link
            key={char.id}
            to={`/characters/${char.id}`}
            className='bg-gray-800 rounded-lg p-4 flex items-center gap-4 
                       hover:bg-gray-700 transition border border-gray-700'
          >
            <img
              src={char.image}
              alt={char.name}
              className='w-16 h-16 rounded object-cover'
            />
            <div>
              <p className='text-lg font-semibold text-white'>{char.name}</p>
              <p className='text-gray-400 text-sm'>{char.species}</p>
            </div>
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
