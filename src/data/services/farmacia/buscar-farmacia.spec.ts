import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { GrpcClient } from "../../contracts/grpc-client"
import { BuscarFarmaciaService } from "./buscar-farmacia"

interface SutTypes {
    grpcClient: GrpcClient
    sut: BuscarFarmaciaService
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

const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(makeFarmacia()))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new BuscarFarmaciaService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

describe('BuscarFarmacia Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        await sut.buscar(1)
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'buscar', { id: 1})
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.buscar(1)
        await expect(promise).rejects.toThrow()
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.buscar(1)
        expect(farmacia).toEqual(makeFarmacia())
      })
})