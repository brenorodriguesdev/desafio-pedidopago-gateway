export interface GrpcClient {
    call(func: string, payload: any, metadata: any): Promise<any>
}