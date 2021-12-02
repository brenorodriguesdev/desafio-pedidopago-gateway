import { UpdateFarmaciaModel } from "../../../domain/models/farmacia/updateFarmacia";
import { AtualizarFarmaciaUseCase } from "../../../domain/useCases/farmacia/atualizar-farmacia";
import { GrpcClient } from "../../contracts/grpc-client";

export class AtualizarFarmaciaService implements AtualizarFarmaciaUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async atualizar(data: UpdateFarmaciaModel): Promise<void | Error> {
        await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'atualizar', data)
    }
}