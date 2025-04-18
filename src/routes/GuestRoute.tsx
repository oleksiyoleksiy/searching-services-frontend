import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Outlet } from 'react-router-dom'
import NotFound from '@/pages/NotFound'

function GuestRoute() {
  const { user } = useSelector((s: RootState) => s.auth)

  return user ? <NotFound /> : <Outlet />
}

export default GuestRoute
