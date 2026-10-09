import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authServiceInstance } from '@/api/implements';
import { useAuthStoreData } from '@/stores/useAuthStore';

export function useAccountNavigation() {
  const { auth, accessToken, refreshToken, authLogout } = useAuthStoreData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = useQuery({
    queryKey: ['account-profile', auth?._id],
    queryFn: () => authServiceInstance.getProfile(),
    enabled: !!auth?._id && !!accessToken,
    staleTime: 60_000,
    retry: false,
  });
  const user = profile.data || auth;
  const name = user?.razao_social || user?.fullname || user?.email || '';
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
    .map(part => part[0]).join('').toUpperCase();
  const isCompany = user?.role === 'empresa';
  const home = isCompany ? '/empresa/certificados' : '/meus-certificados';

  async function logout() {
    try {
      if (refreshToken) await authServiceInstance.logout(refreshToken);
    } catch {
      // Clear the local session even when the server cannot revoke the token.
    } finally {
      await queryClient.cancelQueries();
      authLogout();
      queryClient.clear();
      navigate('/login', { replace: true });
    }
  }

  return { name, initials, isCompany, home, logout,
    openProfile: () => navigate('/perfil'), goHome: () => navigate(home) };
}
