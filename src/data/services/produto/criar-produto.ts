import { CriarProdutoModel } from "../../../domain/models/produto/criar-produtos";
import { ProdutoModel } from "../../../domain/models/produto/produto";
import { CriarProdutoUseCase } from "../../../domain/useCases/produto/criar-produtos";
import { GrpcClient } from "../../contracts/grpc-client";

export class CriarProdutoService implements CriarProdutoUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async criar(data: CriarProdutoModel): Promise<ProdutoModel | Error> {
        const produto = await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'criar', data)
        return produto
    }
}