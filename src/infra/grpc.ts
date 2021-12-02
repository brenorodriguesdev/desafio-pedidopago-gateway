import { GrpcClient } from "../data/contracts/grpc-client";
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

export class GRPC implements GrpcClient {
    async call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {

        const protoObject = protoLoader.loadSync(proto)
        const protoLoaded = grpc.loadPackageDefinition(protoObject)

        var client = new protoLoaded[service](connection, grpc.credentials.createInsecure());

        const response = await new Promise((resolve, reject) => client[func](payload, metadata, function (err, response) {
            if (err) {
                return reject(err)
            }
            resolve(response)
        }))

        return response
    }
}