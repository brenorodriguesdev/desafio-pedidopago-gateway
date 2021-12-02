import { ListarFarmaciasSedesModel } from "../../../domain/models/farmacia/listar-farmaciasSedes";
import { ListarFarmaciasSedesUseCase } from "../../../domain/useCases/farmacia/listar-farmaciasSedes";
import { GrpcClient } from "../../contracts/grpc-client";

export class ListarFarmaciasSedesService implements ListarFarmaciasSedesUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async listar(): Promise<ListarFarmaciasSedesModel> {
        const farmaciasSedes = await this.grpcClient.call('farmacia.proto',process.env.GRPC_CONNECTION_FARMACIA, 'FarmaciaService', 'listarSedes', { })
        return farmaciasSedes
    }
}