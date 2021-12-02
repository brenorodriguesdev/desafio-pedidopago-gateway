import { ProdutosModel } from "../../../domain/models/produto/produto";
import { ListarProdutosUseCase } from "../../../domain/useCases/produto/listar-produtos";
import { GrpcClient } from "../../contracts/grpc-client";

export class ListarProdutosService implements ListarProdutosUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async listar(): Promise<ProdutosModel> {
        const produtos = await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'listar', {})
        return produtos
    }
}