import { FarmaciaModel } from "../../../domain/models/farmacia/farmacia";
import { BuscarFarmaciaUseCase } from "../../../domain/useCases/farmacia/buscar-farmacia";
import { GrpcClient } from "../../contracts/grpc-client";

export class BuscarFarmaciaService implements BuscarFarmaciaUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async buscar(id: number): Promise<FarmaciaModel | Error> {
        const farmacia = await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'buscar', { id })
        return farmacia
    }
}