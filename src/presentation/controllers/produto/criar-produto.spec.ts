import { CriarProdutoModel } from "../../../domain/models/produto/criar-produtos"
import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel } from "../../../domain/models/produto/produto"
import { ClonarProdutoUseCase } from "../../../domain/useCases/produto/clonar-produto"
import { CriarProdutoUseCase } from "../../../domain/useCases/produto/criar-produtos"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { CriarProdutoController } from "./criar-produto"

interface SutTypes {
    validator: Validator
    criarProdutoUseCase: CriarProdutoUseCase
    sut: CriarProdutoController
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

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeCriarProdutoUseCase = (): CriarProdutoUseCase => {
    class CriarProdutoUseCaseStub implements CriarProdutoUseCase {
        async criar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProduto()))
        }
    }
    return new CriarProdutoUseCaseStub()
}


const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarProdutoUseCase = makeCriarProdutoUseCase()

    const sut = new CriarProdutoController(validator, criarProdutoUseCase)
    return {
        validator,
        criarProdutoUseCase,
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

const makeRequest = (): HttpRequest => ({
    body: makeData()
})

describe('CriarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
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
        const { sut, criarProdutoUseCase } = makeSut()
        const clonarSpy = jest.spyOn(criarProdutoUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(clonarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um ok com produto', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(ok(makeProduto()))
      })
})