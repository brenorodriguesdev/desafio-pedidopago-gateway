import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { FarmaciaSedeModel } from "../../../domain/models/farmacia/farmaciaSede"
import { ListarFarmaciasSedesModel } from "../../../domain/models/farmacia/listar-farmaciasSedes"
import { ListarFarmaciasSedesUseCase } from "../../../domain/useCases/farmacia/listar-farmaciasSedes"
import { ok, serverError } from "../../contracts/http-helper"
import { ListarFarmaciasSedesController } from "./listar-farmaciasSedes"


interface SutTypes {
    listarFarmaciasSedesUseCase: ListarFarmaciasSedesUseCase
    sut: ListarFarmaciasSedesController
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

const makeFarmaciaSede = (): FarmaciaSedeModel => ({
    id: 1,
    farmacia: makeFarmacia(),
    filias: [makeFarmacia(), makeFarmacia()]
})

const makeFarmacias = (): ListarFarmaciasSedesModel => ({
    farmaciasSedes: [makeFarmaciaSede(), makeFarmaciaSede()]
})

const makeListarFarmaciasSedesUseCase = (): ListarFarmaciasSedesUseCase => {
    class ListarFarmaciasSedesUseCaseStub implements ListarFarmaciasSedesUseCase {
        async listar(): Promise<ListarFarmaciasSedesModel> {
            return new Promise(resolve => resolve(makeFarmacias()))
        }
    }
    return new ListarFarmaciasSedesUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarFarmaciasSedesUseCase = makeListarFarmaciasSedesUseCase()
    const sut = new ListarFarmaciasSedesController(listarFarmaciasSedesUseCase)
    return {
        listarFarmaciasSedesUseCase,
        sut
    }
}

describe('ListarFarmaciasSedes Controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarFarmaciasSedesUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarFarmaciasSedesUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o buscar retornar uma exceção retornar um serverError', async () => {
        const { sut, listarFarmaciasSedesUseCase } = makeSut()
        jest.spyOn(listarFarmaciasSedesUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle()
        await expect(httpResponse).toEqual(serverError())
    })

    test('Garantir que se tudo ocorrer corretamente retornar um ok com farmacias sedes', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle()
        await expect(httpResponse).toEqual(ok(makeFarmacias()))
    })
})