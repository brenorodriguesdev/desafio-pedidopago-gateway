import { ListarFarmaciasModel } from "../../../domain/models/farmacia/listar-farmacias";
import { ListarFarmaciasUseCase } from "../../../domain/useCases/farmacia/listar-farmacias";
import { GrpcClient } from "../../contracts/grpc-client";

export class ListarFarmaciasService implements ListarFarmaciasUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async listar(): Promise<ListarFarmaciasModel> {
        const farmacias = await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'listar', { })
        return farmacias
    }
}