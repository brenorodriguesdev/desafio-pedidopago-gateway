import { DeletarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/deletar-farmaciaFilial";
import { GrpcClient } from "../../contracts/grpc-client";

export class DeletarFarmaciaFilialService implements DeletarFarmaciaFilialUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async deletar(id: number): Promise<void | Error> {
        await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'deletarFilial', { id })
    }
}