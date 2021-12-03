import { CriarProdutoModel } from "../../../domain/models/produto/criar-produtos"
import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel, ProdutosModel } from "../../../domain/models/produto/produto"
import { CriarProdutosUseCase, CriarProdutoUseCase } from "../../../domain/useCases/produto/criar-produtos"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { MissingParamError } from "../../errors/missing-param-error"
import { CriarProdutoController } from "./criar-produto"
import { CriarProdutosController } from "./criar-produtos"

interface SutTypes {
    validator: Validator
    criarProdutosUseCase: CriarProdutosUseCase
    sut: CriarProdutosController
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

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeCriarProdutosUseCase = (): CriarProdutosUseCase => {
    class CriarProdutosUseCaseStub implements CriarProdutosUseCase {
        async criar(): Promise<ProdutosModel | Error> {
            return new Promise(resolve => resolve(makeProdutos()))
        }
    }
    return new CriarProdutosUseCaseStub()
}


const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarProdutosUseCase = makeCriarProdutosUseCase()

    const sut = new CriarProdutosController(validator, criarProdutosUseCase)
    return {
        validator,
        criarProdutosUseCase,
        sut
    }
}

const makeCriarProduto = (): CriarProdutoModel => ({
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1, 2],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

const makeRequest = (): HttpRequest => ({
    body: {
        produtos: [makeCriarProduto(), makeCriarProduto()]
    }
})

describe('CriarProdutos controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeCriarProduto())
    })

    test('Garantir que se o validate retornar uma exceção retornar um badRequest', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que se o validate retornar um error retornar um badRequest', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

      test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutosUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarProdutosUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith([makeCriarProduto(), makeCriarProduto()])
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, criarProdutosUseCase } = makeSut()
        jest.spyOn(criarProdutosUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que se o produtos tiver vazio retornar badRequest', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({
            body: {}
        })
        await expect(httpResponse).toEqual(badRequest(new MissingParamError('produtos')))
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um ok com produtos', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(ok(makeProdutos()))
      })
})