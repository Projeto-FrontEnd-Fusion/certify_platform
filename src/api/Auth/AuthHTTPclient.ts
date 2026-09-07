import axios, { type AxiosInstance } from "axios"

export class AuthApiInstance {
  private static instance: AxiosInstance | null = null
  
  
  private constructor() {}

  public static createInstance(baseURL: string): AxiosInstance {
    const setup = axios.create({
      baseURL,
      headers: { 
        "Content-Type": "application/json",
        
      },
      timeout: 10000, 
    })
    setup.interceptors.request.use((config) => {
      const rawSession = localStorage.getItem("auth-storage")
      if (!rawSession) return config

      try {
        const session = JSON.parse(rawSession)
        const accessToken = session?.state?.accessToken
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
      } catch {
        localStorage.removeItem("auth-storage")
      }

      return config
    })
    return setup
  }

  public static getInstance(API_URL?: string): AxiosInstance {
    if (!API_URL) {
      throw new Error("API_URL é obrigatória para a primeira inicialização")
    }
    
    if (!this.instance) {
      this.instance = this.createInstance(API_URL)
    }
    
    return this.instance
  }

}
