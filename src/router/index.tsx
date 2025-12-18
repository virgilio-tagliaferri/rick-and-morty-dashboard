import { createBrowserRouter } from 'react-router-dom';
import CharacterListPage from '../features/chrs/pages/CharacterListPage';
import CharacterDetailsPage from '../features/chrs/pages/CharacterDetailsPage';
import EpisodeListPage from '../features/eps/pages/EpisodeListPage';
import EpisodeDetailsPage from '../features/eps/pages/EpisodeDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: 'chars', element: <CharacterListPage /> },
      { path: 'chars/:id', element: <CharacterDetailsPage /> },
      { path: 'eps', element: <EpisodeListPage /> },
      { path: 'eps/:id', element: <EpisodeDetailsPage /> },
    ],
  },
]);
