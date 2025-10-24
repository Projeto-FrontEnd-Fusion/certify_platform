import { ProtectedUserRouter } from "@/components/ProtectedUserRouters"
import { Outlet } from "react-router-dom"

export const AuthProtectedLayout = () =>{
  return(
    <ProtectedUserRouter>
      <Outlet />
    </ProtectedUserRouter>
  )
}