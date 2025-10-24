import { ProtectedAuthRouter } from "@/components/ProtectedUserRouters"
import { Outlet } from "react-router-dom"

export const AuthProtectedLayout = () =>{
  return(
    <ProtectedAuthRouter>
      <Outlet />
    </ProtectedAuthRouter>
  )
}