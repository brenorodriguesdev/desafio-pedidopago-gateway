import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { BuscarFarmaciaUseCase } from "../../../domain/useCases/farmacia/buscar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { BuscarFarmaciaController } from "./buscar-farmacia"


interface SutTypes {
    validator: Validator
    buscarFarmaciaUseCase: BuscarFarmaciaUseCase
    sut: BuscarFarmaciaController
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

const makeBuscarFarmaciaUseCase = (): BuscarFarmaciaUseCase => {
    class BuscarFarmaciaUseCaseStub implements BuscarFarmaciaUseCase {
        async buscar(): Promise<FarmaciaModel | Error> {
            return new Promise(resolve => resolve(makeFarmacia()))
        }
    }
    return new BuscarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const buscarFarmaciaUseCase = makeBuscarFarmaciaUseCase()
    const sut = new BuscarFarmaciaController(validator, buscarFarmaciaUseCase)
    return {
        validator,
        buscarFarmaciaUseCase,
        sut
    }
}

const makeRequest = (): HttpRequest => ({
    params: { id: 1}
})

describe('BuscarFarmacia Controller', () => {
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

    test('Garantir que buscar seja chamado com os valores corretos', async () => {
        const { sut, buscarFarmaciaUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(buscarFarmaciaUseCase, 'buscar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção retornar um badRequest', async () => {
        const { sut, buscarFarmaciaUseCase } = makeSut()
        jest.spyOn(buscarFarmaciaUseCase, 'buscar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um ok com farmacia', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(ok(makeFarmacia()))
    })
})