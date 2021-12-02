import { GrpcClient } from "../data/contracts/grpc-client";
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

export class GRPC implements GrpcClient {
    async call(proto: string, connection: string, service: string, func: string, payload: any, metadata: any): Promise<any> {

        const protoObject = protoLoader.loadSync(path.resolve(__dirname, '/protos/', proto))
        const protoLoaded = grpc.loadPackageDefinition(protoObject)

        var client = new protoLoaded[service](connection, grpc.credentials.createInsecure());
        const response = client[func](payload, metadata, function (error, response) {
            if (error) {
                throw error
            }

            return response
        });
        return response
    }
}