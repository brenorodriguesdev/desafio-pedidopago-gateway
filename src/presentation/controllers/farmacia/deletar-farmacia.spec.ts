import { DeletarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/deletar-farmaciaFilial"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"
import { DeletarFarmaciaFilialController } from "./deletar-farmaciaFilial"


interface SutTypes {
    validator: Validator
    deletarFarmaciaFilialUseCase: DeletarFarmaciaFilialUseCase
    sut: DeletarFarmaciaFilialController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarFarmaciaFilialUseCase = (): DeletarFarmaciaFilialUseCase => {
    class DeletarFarmaciaFilialUseCaseStub implements DeletarFarmaciaFilialUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarFarmaciaFilialUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarFarmaciaFilialUseCase = makeDeletarFarmaciaFilialUseCase()
    const sut = new DeletarFarmaciaFilialController(validator, deletarFarmaciaFilialUseCase)
    return {
        validator,
        deletarFarmaciaFilialUseCase,
        sut
    }
}


const makeRequest = (): HttpRequest => ({
    params: { id: 1 }
})

describe('DeletarFarmacia Controller', () => {
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

    test('Garantir que deletar seja chamado com os valores corretos', async () => {
        const { sut, deletarFarmaciaFilialUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarFarmaciaFilialUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção retornar um badRequest', async () => {
        const { sut, deletarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaFilialUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um noContent', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(noContent())
    })
})