import { DeletarProdutoUseCase } from "../../../domain/useCases/produto/deletar-produto";
import { GrpcClient } from "../../contracts/grpc-client";

export class DeletarProdutoService implements DeletarProdutoUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async deletar(id: number): Promise<void | Error> {
        await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'deletar', { id })
    }
}