import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia";
import { CriarFarmaciaUseCase } from "../../../domain/useCases/farmacia/criar-farmacia";
import { GrpcClient } from "../../contracts/grpc-client";

export class CriarFarmaciaService implements CriarFarmaciaUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async criar(data: FarmaciaModel): Promise<FarmaciaModel | Error> {
        const farmacia = await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'criar', data)
        return farmacia
    }
}