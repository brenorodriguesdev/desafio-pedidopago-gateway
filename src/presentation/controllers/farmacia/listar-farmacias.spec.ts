import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { ListarFarmaciasModel } from "../../../domain/models/farmacia/listar-farmacias"
import { ListarFarmaciasUseCase } from "../../../domain/useCases/farmacia/listar-farmacias"
import { Validator } from "../../../validation/contracts/validator"
import { HttpRequest } from "../../contracts/http"
import { ok, serverError } from "../../contracts/http-helper"
import { ListarFarmaciasController } from "./listar-farmacias"


interface SutTypes {
    listarFarmaciasUseCase: ListarFarmaciasUseCase
    sut: ListarFarmaciasController
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

const makeFarmacias = (): ListarFarmaciasModel => ({
    farmacias: [makeFarmacia(), makeFarmacia()]
})

const makeListarFarmaciasUseCase = (): ListarFarmaciasUseCase => {
    class ListarFarmaciasUseCaseStub implements ListarFarmaciasUseCase {
        async listar(): Promise<ListarFarmaciasModel> {
            return new Promise(resolve => resolve(makeFarmacias()))
        }
    }
    return new ListarFarmaciasUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarFarmaciasUseCase = makeListarFarmaciasUseCase()
    const sut = new ListarFarmaciasController(listarFarmaciasUseCase)
    return {
        listarFarmaciasUseCase,
        sut
    }
}

describe('ListarFarmacias Controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarFarmaciasUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(listarFarmaciasUseCase, 'listar')
        await sut.handle()
        expect(atualizarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o buscar retornar uma exceção retornar um serverError', async () => {
        const { sut, listarFarmaciasUseCase } = makeSut()
        jest.spyOn(listarFarmaciasUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle()
        await expect(httpResponse).toEqual(serverError())
    })

    test('Garantir que se tudo ocorrer corretamente retornar um ok com farmacias', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle()
        await expect(httpResponse).toEqual(ok(makeFarmacias()))
    })
})