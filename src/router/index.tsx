import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import RootLayout from '@/layouts/RootLayout'
import AllCategories from '@/pages/AllCategories'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import CategoryPage from '@/pages/CategoryPage'
import ManageBookings from '@/pages/dashboard/provider/ManageBookings'
import ProviderDashboard from '@/pages/dashboard/ProviderDashboard'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ProviderProfile from '@/pages/ProviderProfile'
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
          { path: 'categories', element: <AllCategories /> },
          {
            path: '/category/:categoryId',
            element: <CategoryPage />,
          },
          {
            path: '/provider/:id',
            element: <ProviderProfile />,
          },
          {
            path: '/auth/login',
            element: <Login />,
          },
          {
            path: '/auth/register',
            element: <Register />,
          },
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
    path: '/provider/dashboard',
    element: <ProviderDashboard />,
    children: [
      // {
      //   index: true,
      //   element: 
      // }
      {
        path: 'bookings',
        element: <ManageBookings />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
