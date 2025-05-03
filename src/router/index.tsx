import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import RootLayout from '@/layouts/RootLayout'
import AllCategories from '@/pages/AllCategories'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import CategoryPage from '@/pages/CategoryPage'
import AdminHome from '@/pages/dashboard/admin/AdminHome'
import AdminSettings from '@/pages/dashboard/admin/AdminSettings'
import Notifications from '@/pages/dashboard/admin/Notifications'
import ServiceManagement from '@/pages/dashboard/admin/ServiceManagement'
import UserManagement from '@/pages/dashboard/admin/UserManagement'
import AdminDashboard from '@/pages/dashboard/AdminDashboard'
import Dashboard from '@/pages/dashboard/provider/Dashboard'
import ManageBookings from '@/pages/dashboard/provider/ManageBookings'
import MyServices from '@/pages/dashboard/provider/MyServices'
import ProfileSettings from '@/pages/dashboard/provider/ProfileSettings'
import ProviderChat from '@/pages/dashboard/provider/ProviderChat'
import ProviderReviews from '@/pages/dashboard/provider/ProviderReviews'
import ProviderDashboard from '@/pages/dashboard/ProviderDashboard'
import BookingHistory from '@/pages/dashboard/user/BookingHistory'
import FavoriteServices from '@/pages/dashboard/user/FavoriteServices'
import UserHome from '@/pages/dashboard/user/UserHome'
import UserSettings from '@/pages/dashboard/user/UserSettings'
import UserDashboard from '@/pages/dashboard/UserDashboard'
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
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'services',
        element: <MyServices />
      },
      {
        path: 'bookings',
        element: <ManageBookings />
      },
      {
        path: 'chat',
        element: <ProviderChat />
      },
      {
        path: 'reviews',
        element: <ProviderReviews />
      },
      {
        path: 'settings',
        element: <ProfileSettings />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <UserHome />
      },
      {
        path: 'bookings',
        element: <BookingHistory />
      },
      {
        path: 'favorites',
        element: <FavoriteServices />
      },
      {
        path: 'settings',
        element: <UserSettings />
      },
    ]
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminHome />
      },
      {
        path: 'users',
        element: <UserManagement />
      },
      {
        path: 'services',
        element: <ServiceManagement />
      },
      {
        path: 'notifications',
        element: <Notifications />
      },
      {
        path: 'settings',
        element: <AdminSettings />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
