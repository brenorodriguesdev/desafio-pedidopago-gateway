import { AtualizarProdutoModel } from "../../../domain/models/produto/atualizar-produto"
import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel } from "../../../domain/models/produto/produto"
import { BuscarProdutoUseCase } from "../../../domain/useCases/produto/buscar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { BuscarProdutoController } from "./buscar-produto"

interface SutTypes {
    validator: Validator
    buscarProdutoUseCase: BuscarProdutoUseCase
    sut: BuscarProdutoController
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

const makeBuscarProdutoUseCase = (): BuscarProdutoUseCase => {
    class BuscarProdutoUseCaseStub implements BuscarProdutoUseCase {
        async buscar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProduto()))
        }
    }
    return new BuscarProdutoUseCaseStub()
}


const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const buscarProdutoUseCase = makeBuscarProdutoUseCase()

    const sut = new BuscarProdutoController(validator, buscarProdutoUseCase)
    return {
        validator,
        buscarProdutoUseCase,
        sut
    }
}

const makeRequest = (): HttpRequest => ({
    params: {
        id: 1
    }
})

describe('BuscarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith({ id: 1 })
    })

    test('Garantir que se o validate retornar uma exceção retornar um badRequest', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que buscar seja chamado com a id correta', async () => {
        const { sut, buscarProdutoUseCase } = makeSut()
        const buscarSpy = jest.spyOn(buscarProdutoUseCase, 'buscar')
        await sut.handle(makeRequest())
        expect(buscarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção retornar um badRequest', async () => {
        const { sut, buscarProdutoUseCase } = makeSut()
        jest.spyOn(buscarProdutoUseCase, 'buscar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um ok com produto', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(ok(makeProduto()))
      })
})