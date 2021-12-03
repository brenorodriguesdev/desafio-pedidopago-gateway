import { UpdateFarmaciaModel } from "../../../domain/models/farmacia/updateFarmacia"
import { AtualizarFarmaciaUseCase } from "../../../domain/useCases/farmacia/atualizar-farmacia"
import { AtualizarProdutoUseCase } from "../../../domain/useCases/produto/atualizar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"
import { AtualizarFarmaciaController } from "./atualizar-farmacia"


interface SutTypes {
    validator: Validator
    atualizarFarmaciaUseCase: AtualizarFarmaciaUseCase
    sut: AtualizarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}


const makeAtualizarFarmaciaUseCase = (): AtualizarFarmaciaUseCase => {
    class AtualizarFarmaciaUseCaseStub implements AtualizarFarmaciaUseCase {
        async atualizar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AtualizarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const atualizarFarmaciaUseCase = makeAtualizarFarmaciaUseCase()
    const sut = new AtualizarFarmaciaController(validator, atualizarFarmaciaUseCase)
    return {
        validator,
        atualizarFarmaciaUseCase,
        sut
    }
}

const makeData = (): UpdateFarmaciaModel => ({
    id: 1,
    logo: 'logo',
    nome: 'nome',
    cnpj: 'cnpj',
    endereco: 'endereco',
    horarioFuncionamento: 'horarioFuncionamento',
    responsavel: 'responsavel',
    telefone: 'telefone',
    outros: 'outros'
})

const makeRequest = (): HttpRequest => ({
    body: makeData()
})

describe('AtualizarFarmacia Controller', () => {
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
        const { sut, atualizarFarmaciaUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(atualizarFarmaciaUseCase, 'atualizar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o atualizar retornar uma exceção retornar um badRequest', async () => {
        const { sut, atualizarFarmaciaUseCase } = makeSut()
        jest.spyOn(atualizarFarmaciaUseCase, 'atualizar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um noContent', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(noContent())
    })
})