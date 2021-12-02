import { AtualizarProdutoModel } from "../../../domain/models/produto/atualizar-produto";
import { AtualizarProdutoUseCase } from "../../../domain/useCases/produto/atualizar-produto";
import { GrpcClient } from "../../contracts/grpc-client";

export class AtualizarProdutoService implements AtualizarProdutoUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async atualizar(data: AtualizarProdutoModel): Promise<void | Error> {
        await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'atualizar', data)
    }
}