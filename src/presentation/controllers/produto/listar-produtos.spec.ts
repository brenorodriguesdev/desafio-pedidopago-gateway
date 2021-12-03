import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel, ProdutosModel } from "../../../domain/models/produto/produto"
import { ListarProdutosUseCase } from "../../../domain/useCases/produto/listar-produtos"
import { ok, serverError } from "../../contracts/http-helper"
import { ListarProdutosController } from "./listar-produtos"

interface SutTypes {
    listarProdutosUseCase: ListarProdutosUseCase
    sut: ListarProdutosController
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

const makeProdutos = (): ProdutosModel => ({
    produtos: [makeProduto(), makeProduto()]
})

const makeListarProdutosUseCase = (): ListarProdutosUseCase => {
    class ListarProdutosUseCaseStub implements ListarProdutosUseCase {
        async listar(): Promise<ProdutosModel> {
            return new Promise(resolve => resolve(makeProdutos()))
        }
    }
    return new ListarProdutosUseCaseStub()
}


const makeSut = (): SutTypes => {
    const listarProdutosUseCase = makeListarProdutosUseCase()

    const sut = new ListarProdutosController(listarProdutosUseCase)
    return {
        listarProdutosUseCase,
        sut
    }
}

describe('ListarProdutos controller', () => {

      test('Garantir que listar seja chamado com o valor correto', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarProdutosUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o criar retornar uma exceção retornar um serverError', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        jest.spyOn(listarProdutosUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle()
        await expect(httpResponse).toEqual(serverError())
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um ok com produtos', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle()
        expect(httpResponse).toEqual(ok(makeProdutos()))
      })
})