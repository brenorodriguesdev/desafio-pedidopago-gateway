import { UpdateFarmaciaModel } from "../../../domain/models/farmacia/updateFarmacia";
import { AtualizarFarmaciaUseCase } from "../../../domain/useCases/farmacia/atualizar-farmacia";
import { GrpcClient } from "../../contracts/grpc-client";

export class AtualizarFarmaciaService implements AtualizarFarmaciaUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async atualizar(data: UpdateFarmaciaModel): Promise<void | Error> {
        await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'atualizar', data)
    }
}