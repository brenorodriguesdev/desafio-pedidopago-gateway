import { CriarProdutoModel } from "../../../domain/models/produto/criar-produtos"
import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel } from "../../../domain/models/produto/produto"
import { GrpcClient } from "../../contracts/grpc-client"
import { CriarProdutoService } from "./criar-produto"

interface SutTypes {
    grpcClient: GrpcClient
    sut: CriarProdutoService
}

const makeIngrediente = (id: number): IngredienteModel => ({
    id,
    nome: 'nome'
})

const makeProduto = (): ProdutoModel => ({
    id: 1,
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [makeIngrediente(1), makeIngrediente(2)],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(makeProduto()))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new CriarProdutoService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

const makeData = (): CriarProdutoModel => ({
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1,2],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

describe('CriarProduto Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        const data = makeData()
        await sut.criar(data)
        expect(callSpy).toHaveBeenCalledWith('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'criar', data)
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um produto', async () => {
        const { sut } = makeSut()
        const produto = await sut.criar(makeData())
        expect(produto).toEqual(makeProduto())
      })
})