import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStoreData } from '@/stores/useAuthStore';

type SessionRequest = InternalAxiosRequestConfig & { sessionRetried?: boolean };
let renewal: Promise<string> | null = null;

function endSession() {
  useAuthStoreData.getState().authLogout();
  if (window.location.pathname !== '/login') window.location.replace('/login');
}

async function renewSession(baseURL: string, refreshToken: string) {
  try {
    const response = await axios.post(`${baseURL.replace(/\/$/, '')}/auth/refresh`,
      { refresh_token: refreshToken }, { timeout: 10000 });
    const tokens = response.data?.data;
    if (!tokens?.access_token || !tokens?.refresh_token) throw new Error('Resposta de renovação inválida');
    const session = useAuthStoreData.getState();
    // Ignore a response belonging to a session that was replaced or signed out.
    if (!session.auth || session.refreshToken !== refreshToken) throw new Error('Sessão alterada');
    session.setAuthLogin(session.auth, tokens.access_token, tokens.refresh_token);
    return tokens.access_token as string;
  } catch (error) {
    if (axios.isAxiosError(error) && [401, 403].includes(error.response?.status || 0)
      && useAuthStoreData.getState().refreshToken === refreshToken) endSession();
    throw error;
  }
}

export function installSessionInterceptors(client: AxiosInstance, baseURL: string) {
  client.interceptors.request.use(config => {
    const token = useAuthStoreData.getState().accessToken;
    if (token) config.headers.set('Authorization', `Bearer ${token}`);
    return config;
  });
  client.interceptors.response.use(response => response, async error => {
    if (!axios.isAxiosError(error)) throw error;
    const config = error.config as SessionRequest | undefined;
    const publicRequest = /\/auth\/(login|signup(?:\/company)?|refresh|forgot-password|verify-code|reset-password)(?:\?|$)/.test(config?.url || '')
      || (config?.url || '').includes('/certificate/validate/');
    if (error.response?.status !== 401 || !config || publicRequest || !config.headers.get('Authorization')) throw error;
    const session = useAuthStoreData.getState();
    if (config.sessionRetried || !session.refreshToken) {
      endSession();
      throw error;
    }
    config.sessionRetried = true;
    const requestToken = config.headers.get('Authorization');
    if (requestToken === `Bearer ${session.accessToken}`) {
      if (!renewal) {
        renewal = renewSession(baseURL, session.refreshToken).finally(() => { renewal = null; });
      }
      await renewal;
    }
    const current = useAuthStoreData.getState();
    if (!current.accessToken) throw error;
    config.headers.set('Authorization', `Bearer ${current.accessToken}`);
    if (config.url === '/auth/logout') config.data = JSON.stringify({ refresh_token: current.refreshToken });
    return client.request(config);
  });
}
