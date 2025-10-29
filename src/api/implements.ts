import { AuthApiInstance } from "./Auth/AuthHTTPclient";
import { AuthService } from "./Auth/AuthService";

const API_URL = import.meta.env.VITE_API_URL

const authApiIntance = AuthApiInstance.getInstance(API_URL)
export const authServiceInstance = new AuthService(authApiIntance)