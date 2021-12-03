import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { CriarFarmaciaUseCase } from "../../../domain/useCases/farmacia/criar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { CriarFarmaciaController } from "./criar-farmacia"


interface SutTypes {
    validator: Validator
    criarFarmaciaUseCase: CriarFarmaciaUseCase
    sut: CriarFarmaciaController
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

const makeCriarFarmaciaUseCase = (): CriarFarmaciaUseCase => {
    class CriarFarmaciaUseCaseStub implements CriarFarmaciaUseCase {
        async criar(): Promise<FarmaciaModel | Error> {
            return new Promise(resolve => resolve(makeFarmacia()))
        }
    }
    return new CriarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaUseCase = makeCriarFarmaciaUseCase()
    const sut = new CriarFarmaciaController(validator, criarFarmaciaUseCase)
    return {
        validator,
        criarFarmaciaUseCase,
        sut
    }
}


const makeData = (): FarmaciaModel => ({
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

describe('CriarFarmacia Controller', () => {
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
        const { sut, criarFarmaciaUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(criarFarmaciaUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção retornar um badRequest', async () => {
        const { sut, criarFarmaciaUseCase } = makeSut()
        jest.spyOn(criarFarmaciaUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um ok com farmacia', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(ok(makeFarmacia()))
    })
})