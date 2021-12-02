import { UpdateFarmaciaModel } from "../../../domain/models/farmacia/updateFarmacia"
import { GrpcClient } from "../../contracts/grpc-client"
import { AtualizarFarmaciaService } from "./atualizar-farmacia"

interface SutTypes {
    grpcClient: GrpcClient
    sut: AtualizarFarmaciaService
}

const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new AtualizarFarmaciaService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

const makeData = (): UpdateFarmaciaModel => ({
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

describe('AtualizarFarmacia Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        const data = makeData()
        await sut.atualizar(data)
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'atualizar', data)
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
      })
})