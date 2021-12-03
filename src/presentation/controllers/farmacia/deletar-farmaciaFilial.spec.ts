import { DeletarFarmaciaUseCase } from "../../../domain/useCases/farmacia/deletar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"
import { DeletarFarmaciaController } from "./deletar-farmacia"


interface SutTypes {
    validator: Validator
    deletarFarmaciaUseCase: DeletarFarmaciaUseCase
    sut: DeletarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarFarmaciaUseCase = (): DeletarFarmaciaUseCase => {
    class DeletarFarmaciaUseCaseStub implements DeletarFarmaciaUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarFarmaciaUseCase = makeDeletarFarmaciaUseCase()
    const sut = new DeletarFarmaciaController(validator, deletarFarmaciaUseCase)
    return {
        validator,
        deletarFarmaciaUseCase,
        sut
    }
}


const makeRequest = (): HttpRequest => ({
    params: { id: 1 }
})

describe('DeletarFarmaciaFilial Controller', () => {
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
        const { sut, deletarFarmaciaUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(deletarFarmaciaUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção retornar um badRequest', async () => {
        const { sut, deletarFarmaciaUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Garantir que se tudo ocorrer corretamente retornar um noContent', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        await expect(httpResponse).toEqual(noContent())
    })
})