export interface GrpcClient {
    call: (proto: string, connection: string, service: string, func: string, payload: any, metadata: any) => Promise<any>
}