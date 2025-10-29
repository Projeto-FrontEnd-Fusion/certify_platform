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