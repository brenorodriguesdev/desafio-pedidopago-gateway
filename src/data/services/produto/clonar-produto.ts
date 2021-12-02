import { ProdutoModel } from "../../../domain/models/produto/produto";
import { ClonarProdutoUseCase } from "../../../domain/useCases/produto/clonar-produto";
import { GrpcClient } from "../../contracts/grpc-client";

export class ClonarProdutoService implements ClonarProdutoUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async clonar(id: number): Promise<ProdutoModel | Error> {
        const produto = await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'clonar', { id })
        return produto
    }
}