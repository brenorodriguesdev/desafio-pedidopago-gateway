import { ProdutoModel } from "../../../domain/models/produto/produto";
import { BuscarProdutoUseCase } from "../../../domain/useCases/produto/buscar-produto";
import { GrpcClient } from "../../contracts/grpc-client";

export class BuscarProdutoService implements BuscarProdutoUseCase {
    constructor (private readonly grpcClient: GrpcClient) {}
    async buscar(id: number): Promise<ProdutoModel | Error> {
        const produto = await this.grpcClient.call('produto.proto',process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'buscar', { id })
        return produto
    }
}