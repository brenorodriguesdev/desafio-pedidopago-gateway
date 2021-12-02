import { UpdateFarmaciaModel } from "../../../domain/models/farmacia/updateFarmacia"
import { AtualizarProdutoModel } from "../../../domain/models/produto/atualizar-produto"
import { GrpcClient } from "../../contracts/grpc-client"
import { AtualizarProdutoService } from "./atualizar-produto"

interface SutTypes {
    grpcClient: GrpcClient
    sut: AtualizarProdutoService
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
    const sut = new AtualizarProdutoService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

const makeData = (): AtualizarProdutoModel => ({
    id: 1,
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1,2],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

describe('AtualizarProduto Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        const data = makeData()
        await sut.atualizar(data)
        expect(callSpy).toHaveBeenCalledWith('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'atualizar', data)
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
      })
})