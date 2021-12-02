import { FarmaciaSedeModel } from "../../../domain/models/farmacia/farmaciaSede";
import { CriarFarmaciaSedeUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaSede";
import { GrpcClient } from "../../contracts/grpc-client";

export class CriarFarmaciaSedeService implements CriarFarmaciaSedeUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async criar(data: FarmaciaSedeModel): Promise<void | Error> {
        await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'criarSede', data)
    }
}