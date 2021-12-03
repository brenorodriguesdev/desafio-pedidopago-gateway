import { IngredienteModel } from "../../../domain/models/produto/ingrediente"
import { ProdutoModel } from "../../../domain/models/produto/produto"
import { ClonarProdutoUseCase } from "../../../domain/useCases/produto/clonar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { ClonarProdutoController } from "./clonar-produto"

interface SutTypes {
    validator: Validator
    clonarProdutoUseCase: ClonarProdutoUseCase
    sut: ClonarProdutoController
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

const makeClonarProdutoUseCase = (): ClonarProdutoUseCase => {
    class ClonarProdutoUseCaseStub implements ClonarProdutoUseCase {
        async clonar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProduto()))
        }
    }
    return new ClonarProdutoUseCaseStub()
}


const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const clonarProdutoUseCase = makeClonarProdutoUseCase()

    const sut = new ClonarProdutoController(validator, clonarProdutoUseCase)
    return {
        validator,
        clonarProdutoUseCase,
        sut
    }
}

const makeRequest = (): HttpRequest => ({
    body: {
        id: 1
    }
})

describe('ClonarProduto controller', () => {
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

      test('Garantir que se o validate retornar um error retornar um badRequest', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

      test('Garantir que clonar seja chamado com a id correta', async () => {
        const { sut, clonarProdutoUseCase } = makeSut()
        const clonarSpy = jest.spyOn(clonarProdutoUseCase, 'clonar')
        await sut.handle(makeRequest())
        expect(clonarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção retornar um badRequest', async () => {
        const { sut, clonarProdutoUseCase } = makeSut()
        jest.spyOn(clonarProdutoUseCase, 'clonar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará um ok com produto', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(ok(makeProduto()))
      })
})