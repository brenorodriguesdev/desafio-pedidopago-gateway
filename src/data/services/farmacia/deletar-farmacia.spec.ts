import { GrpcClient } from "../../contracts/grpc-client"
import { DeletarFarmaciaService } from "./deletar-farmacia"

interface SutTypes {
    grpcClient: GrpcClient
    sut: DeletarFarmaciaService
}

const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new DeletarFarmaciaService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

describe('DeletarFarmacia Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        await sut.deletar(1)
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'deletar', { id: 1 })
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
      })
})