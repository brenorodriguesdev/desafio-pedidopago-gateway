import { DeletarFarmaciaUseCase } from "../../../domain/useCases/farmacia/deletar-farmacia";
import { GrpcClient } from "../../contracts/grpc-client";

export class DeletarFarmaciaService implements DeletarFarmaciaUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async deletar(id: number): Promise<void | Error> {
        await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'deletar', { id })
    }
}