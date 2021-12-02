import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia"
import { ListarFarmaciasModel } from "../../../domain/models/farmacia/listar-farmacias"
import { GrpcClient } from "../../contracts/grpc-client"
import { ListarFarmaciasService } from "./listar-farmacias"

interface SutTypes {
    grpcClient: GrpcClient
    sut: ListarFarmaciasService
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

const makeFarmacias = (): ListarFarmaciasModel => ({
    farmacias: [makeFarmacia(1), makeFarmacia(2)]
})

const makeGrpcClient = (): GrpcClient => {
    class GrpcClientStub implements GrpcClient {
        call(proto: string, connection: string, service: string, func: string, payload?: any, metadata?: any): Promise<any> {
            return new Promise(resolve => resolve(makeFarmacias()))
        }
    }
    return new GrpcClientStub()
}

const makeSut = (): SutTypes => {
    const grpcClient = makeGrpcClient()
    const sut = new ListarFarmaciasService(grpcClient)
    return {
        grpcClient,
        sut
    }
}

describe('ListarFarmacias Service', () => {
    test('Garantir que call seja chamado com os valores corretos', async () => {
        const { sut, grpcClient } = makeSut()
        const callSpy = jest.spyOn(grpcClient, 'call')
        await sut.listar()
        expect(callSpy).toHaveBeenCalledWith('farmacia.proto', process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'listar', {})
    })

    test('Garantir que se o call retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, grpcClient } = makeSut()
        jest.spyOn(grpcClient, 'call').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
      })

      test('Garantir que se ocorrer tudo corretamente o serviço retornará farmacias', async () => {
        const { sut } = makeSut()
        const farmacias = await sut.listar()
        expect(farmacias).toEqual(makeFarmacias())
      })
})