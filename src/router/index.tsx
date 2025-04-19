import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import SearchResults from '@/pages/SearchResult'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'search', element: <SearchResults /> },
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          // { path: 'dashboard', element: <Dashboard /> },
          // { path: 'users', element: <Users /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
