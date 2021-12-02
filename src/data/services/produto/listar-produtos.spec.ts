import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel, ProdutosModel } from "../../../domain/models/produto/produto"
import { GrpcClient } from "../../contracts/grpc-client"
import { ListarProdutosService } from "./listar-produtos"

interface SutTypes {
    grpcClient: GrpcClient
    sut: ListarProdutosService
}

const makeIngrediente = (id: number): IngredienteModel => ({
    id,
    nome: 'nome'
})

const makeProduto = (id: number): ProdutoModel => ({
    id,
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [makeIngrediente(1), makeIngrediente(2)],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

const makeProdutos = (): ProdutosModel => ({
    produtos: [makeProduto(1), makeProduto(2)]
})


const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(makeProdutos()))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new ListarProdutosService(grpcClient)
    return {
        grpcClient,
        sut
    }
}


describe('ListarProdutos Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        await sut.listar()
        expect(callSpy).toHaveBeenCalledWith('produto.proto', process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'listar', {})
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se ocorrer tudo corretamente o serviço retornará produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.listar()
        expect(produtos).toEqual(makeProdutos())
    })
})