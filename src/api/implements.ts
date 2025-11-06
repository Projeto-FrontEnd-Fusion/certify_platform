import { CertificateApiInstance } from "./Certificate/CertificateHTTPclient";
import { CertificateService } from "./Certificate/CertificateService";
import { AuthApiInstance } from "./Auth/AuthHTTPclient";
import { AuthService } from "./Auth/AuthService";

const API_URL = import.meta.env.VITE_API_URL;

const authApiIntance = AuthApiInstance.getInstance(API_URL);
export const authServiceInstance = new AuthService(authApiIntance);

const certificateApiInstance = CertificateApiInstance.getInstance(API_URL);
export const certificateServiceInstance = new CertificateService(certificateApiInstance);
