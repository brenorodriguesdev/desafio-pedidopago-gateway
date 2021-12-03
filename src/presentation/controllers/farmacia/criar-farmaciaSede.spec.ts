import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { FarmaciaSedeModel } from "../../../domain/models/farmacia/farmaciaSede"
import { CriarFarmaciaSedeUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaSede"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, created } from "../../contracts/http-helper"
import { CriarFarmaciaSedeController } from "./criar-farmaciaSede"


interface SutTypes {
    validator: Validator
    criarFarmaciaSedeUseCase: CriarFarmaciaSedeUseCase
    sut: CriarFarmaciaSedeController
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

const makeCriarFarmaciaSedeUseCase = (): CriarFarmaciaSedeUseCase => {
    class CriarFarmaciaSedeUseCaseStub implements CriarFarmaciaSedeUseCase {
        async criar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new CriarFarmaciaSedeUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaSedeUseCase = makeCriarFarmaciaSedeUseCase()
    const sut = new CriarFarmaciaSedeController(validator, criarFarmaciaSedeUseCase)
    return {
        validator,
        criarFarmaciaSedeUseCase,
        sut
    }
}


const makeData = (): FarmaciaSedeModel => ({
    farmacia: makeFarmacia(),
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

    test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarFarmaciaSedeUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarFarmaciaSedeUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, criarFarmaciaSedeUseCase } = makeSut()
        jest.spyOn(criarFarmaciaSedeUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um creted', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(created())
    })
})