import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { FarmaciaSedeModel } from "../../../domain/models/farmacia/farmaciaSede"
import { GrpcClient } from "../../contracts/grpc-client"
import { CriarFarmaciaSedeService } from "./criar-farmaciaSede"

interface SutTypes {
    grpcClient: GrpcClient
    sut: CriarFarmaciaSedeService
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
    const sut = new CriarFarmaciaSedeService(grpcClient)
    return {
        grpcClient,
        sut
    }
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

const makeData = (): FarmaciaSedeModel => ({
    farmacia: makeFarmacia()
})

describe('CriarFarmaciaSede Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        const data = makeData()
        await sut.criar(data)
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'criarSede', data)
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
      })
})