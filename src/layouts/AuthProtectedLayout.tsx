import { Navigate, Outlet } from "react-router-dom"
import { useAuthStoreData } from "@/stores/useAuthStore"

export const AuthProtectedLayout = () =>{
  const { auth, accessToken } = useAuthStoreData()

  if (!auth?._id || !accessToken) {
    return <Navigate to="/login" replace />
  }

  return(
    <Outlet />
  )
}
