import { DeletarProdutoUseCase } from "../../../domain/useCases/produto/deletar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, noContent, ok } from "../../contracts/http-helper"
import { DeletarProdutoController } from "./deletar-produto"

interface SutTypes {
    validator: Validator
    deletarProdutoUseCase: DeletarProdutoUseCase
    sut: DeletarProdutoController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarProdutoUseCase = (): DeletarProdutoUseCase => {
    class DeletarProdutoUseCaseStub implements DeletarProdutoUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarProdutoUseCaseStub()
}


const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarProdutoUseCase = makeDeletarProdutoUseCase()

    const sut = new DeletarProdutoController(validator, deletarProdutoUseCase)
    return {
        validator,
        deletarProdutoUseCase,
        sut
    }
}

const makeRequest = (): HttpRequest => ({
    params: {
        id: 1
    }
})

describe('DeletarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith({ id: 1})
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

      test('Garantir que deletar seja chamado com os valores corretos', async () => {
        const { sut, deletarProdutoUseCase } = makeSut()
        const criarSpy = jest.spyOn(deletarProdutoUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, deletarProdutoUseCase } = makeSut()
        jest.spyOn(deletarProdutoUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
      })
      test('Garantir que se ocorrer tudo corretamente o serviço retornará noContent', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(noContent())
      })
})