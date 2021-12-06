import { GRPC } from './grpc'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const server = new grpc.Server()


const makeSut = (): GRPC => {
    return new GRPC()
}

describe('GRPC', () => {

    beforeAll(async () => {

        const protoObject = protoLoader.loadSync('test.proto')
        const testProto = grpc.loadPackageDefinition(protoObject)

        server.addService(testProto.TestService.service, {
            hello: (call, callback) => {
                if (!call.request.message) {
                    return callback(new Error('MissigParam: message'), null)
                }
                callback(null, { message: 'hello' })
            }
        })

        server.bind('127.0.0.1:50053', grpc.ServerCredentials.createInsecure())
        server.start()
    })

    test('Garantir que a requisição está sendo feita e retornando o resultado', async () => {
        const sut = makeSut()

        const response = await sut.call('test.proto', 'localhost:50053', 'TestService', 'hello', { message: 'hello' })
        expect(response).toEqual({ message: 'hello' })
    })

    test('Garantir que a requisição está sendo feita e retornado a exceção', async () => {
        const sut = makeSut()

        const promise = sut.call('test.proto', 'localhost:50053', 'TestService', 'hello', {})
        await expect(promise).rejects.toThrow()
    })

})