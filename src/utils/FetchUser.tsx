import userService from "@/services/userService"
import { RootState } from "@/store"
import { authActions } from "@/store/authSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function FetchUser() {
  const { accessToken } = useSelector((s: RootState) => s.auth)
  const dispatch = useDispatch()

  const fetchUser = async () => {
    const response = await userService.current()

    if (response) {
      dispatch(authActions.setUser(response))
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchUser()
    }
  }, [accessToken])

  return null
}