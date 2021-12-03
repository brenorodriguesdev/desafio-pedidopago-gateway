import { AtualizarProdutoModel } from "../../../domain/models/produto/atualizar-produto"
import { AtualizarProdutoUseCase } from "../../../domain/useCases/produto/atualizar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"
import { AtualizarProdutoController } from "./atualizar-produto"


interface SutTypes {
    validator: Validator
    atualizarProdutoUseCase: AtualizarProdutoUseCase
    sut: AtualizarProdutoController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}


const makeAtualizarProdutoUseCase = (): AtualizarProdutoUseCase => {
    class AtualizarProdutoUseCaseStub implements AtualizarProdutoUseCase {
        async atualizar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AtualizarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const atualizarProdutoUseCase = makeAtualizarProdutoUseCase()
    const sut = new AtualizarProdutoController(validator, atualizarProdutoUseCase)
    return {
        validator,
        atualizarProdutoUseCase,
        sut
    }
}

const makeData = (): AtualizarProdutoModel => ({
    id: 1,
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1, 2],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

const makeRequest = (): HttpRequest => ({
    body: makeData()
})

describe('AtualizarProduto Controller', () => {
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

    test('Garantir que atualizar seja chamado com os valores corretos', async () => {
        const { sut, atualizarProdutoUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(atualizarProdutoUseCase, 'atualizar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o atualizar retornar uma exceção retornar um badRequest', async () => {
        const { sut, atualizarProdutoUseCase } = makeSut()
        jest.spyOn(atualizarProdutoUseCase, 'atualizar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um noContent', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(noContent())
    })
})