export interface HttpClient {
    get: <T>(endpoint: string, config?: Record<string, any>, params?: any) => Promise<T | undefined>;
    post: <T>(endpoint: string, data: Record<string, any>, config?: any) => Promise<T | undefined>;
}