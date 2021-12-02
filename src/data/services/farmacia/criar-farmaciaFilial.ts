import { CriarFarmaciaFilialModel } from "../../../domain/models/farmacia/criar-farmaciaFilial";
import { CriarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaFilial";
import { GrpcClient } from "../../contracts/grpc-client";

export class CriarFarmaciaFilialService implements CriarFarmaciaFilialUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async criar(data: CriarFarmaciaFilialModel): Promise<void | Error> {
        await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'criarFilial', data)
    }
}