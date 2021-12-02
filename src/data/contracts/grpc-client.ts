export interface GrpcClient {
    call(proto: string, func: string, payload: any, metadata: any): Promise<any>
}