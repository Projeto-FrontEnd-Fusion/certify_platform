import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFakeStore } from "@/stores/mockAuthStore";

export interface ProtectedUserRouterProps {
  children: React.ReactNode;
}

export const ProtectedAuthRouter = ({ children }: ProtectedUserRouterProps) => {
  const { auth } = useFakeStore();
  const navigate = useNavigate();

  const authUser = auth?._id;

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  if (!authUser) {
    return null;
  }

  return <>{children}</>;
};
