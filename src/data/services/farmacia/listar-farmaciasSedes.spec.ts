import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { FarmaciaSedeModel } from "../../../domain/models/farmacia/farmaciaSede"
import { ListarFarmaciasSedesModel } from "../../../domain/models/farmacia/listar-farmaciasSedes"
import { GrpcClient } from "../../contracts/grpc-client"
import { ListarFarmaciasSedesService } from "./listar-farmaciasSedes"

interface SutTypes {
    grpcClient: GrpcClient
    sut: ListarFarmaciasSedesService
}

const makeFarmacia = (id: number): FarmaciaModel => ({
    id,
    logo: 'logo',
    nome: 'nome',
    cnpj: 'cnpj',
    endereco: 'endereco',
    horarioFuncionamento: 'horarioFuncionamento',
    responsavel: 'responsavel',
    telefone: 'telefone',
    outros: 'outros'
})

const makeFarmaciaSede = (id: number): FarmaciaSedeModel => ({
    id,
    farmacia: makeFarmacia(1),
    filias: [makeFarmacia(2), makeFarmacia(3), makeFarmacia(4)]
})

const makeFarmaciasSedes = (): ListarFarmaciasSedesModel => ({
    farmaciasSedes: [makeFarmaciaSede(1), makeFarmaciaSede(2)]
})


const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(makeFarmaciasSedes()))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new ListarFarmaciasSedesService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

describe('ListarFarmaciasSedes Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        await sut.listar()
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'listarSedes', {})
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará farmacias sedes', async () => {
        const { sut } = makeSut()
        const farmacias = await sut.listar()
        expect(farmacias).toEqual(makeFarmaciasSedes())
      })
})