import { Outlet, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userService from '../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice'
import { RootState } from '../store'

import AuthRoute from '../routes/AuthRoute'

function AdminLayout() {
  const { accessToken, isLoading, user } = useSelector((s: RootState) => s.auth)
  const dispatch = useDispatch()

  const fetchUser = async () => {
    dispatch(authActions.setLoading(true))

    const response = await userService.current()

    if (response) {
      dispatch(authActions.setUser(response))
    }

    dispatch(authActions.setLoading(false))
  }

  useEffect(() => {
    fetchUser()
  }, [accessToken])

  return (
    <>
      <div className="bg-gray-200 min-h-lvh">
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout
