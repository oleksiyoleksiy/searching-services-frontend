import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRoute() {
  const { user } = useSelector((s: RootState) => s.auth)

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute
