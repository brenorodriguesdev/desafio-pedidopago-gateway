import { CriarFarmaciaFilialModel } from "../../../domain/models/farmacia/criar-farmaciaFilial"
import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { CriarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaFilial"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, created, ok } from "../../contracts/http-helper"
import { CriarFarmaciaFilialController } from "./criar-farmaciaFilial"


interface SutTypes {
    validator: Validator
    criarFarmaciaFilialUseCase: CriarFarmaciaFilialUseCase
    sut: CriarFarmaciaFilialController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeFarmacia = (): FarmaciaModel => ({
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

const makeCriarFarmaciaFilialUseCase = (): CriarFarmaciaFilialUseCase => {
    class CriarFarmaciaFilialUseCaseStub implements CriarFarmaciaFilialUseCase {
        async criar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new CriarFarmaciaFilialUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaFilialUseCase = makeCriarFarmaciaFilialUseCase()
    const sut = new CriarFarmaciaFilialController(validator, criarFarmaciaFilialUseCase)
    return {
        validator,
        criarFarmaciaFilialUseCase,
        sut
    }
}


const makeData = (): CriarFarmaciaFilialModel => ({
    farmacia: makeFarmacia(),
    idFarmaciaSede: 1
})

const makeRequest = (): HttpRequest => ({
    body: makeData()
})

describe('CriarFarmaciaFilial Controller', () => {
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

    test('Garantir que buscar seja chamado com os valores corretos', async () => {
        const { sut, criarFarmaciaFilialUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(criarFarmaciaFilialUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, criarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(criarFarmaciaFilialUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um creted', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(created())
    })
})