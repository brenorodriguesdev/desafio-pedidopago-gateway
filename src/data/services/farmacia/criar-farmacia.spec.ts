import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { GrpcClient } from "../../contracts/grpc-client"
import { CriarFarmaciaService } from "./criar-farmacia"

interface SutTypes {
    grpcClient: GrpcClient
    sut: CriarFarmaciaService
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
    const sut = new CriarFarmaciaService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

describe('CriarFarmacia Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        const data = makeData()
        await sut.criar(data)
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'criar', data)
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.criar(makeData())
        expect(farmacia).toEqual(makeFarmacia())
      })
})