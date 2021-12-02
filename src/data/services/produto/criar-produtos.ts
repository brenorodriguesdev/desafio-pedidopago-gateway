import { CriarProdutoModel } from "../../../domain/models/produto/criar-produtos";
import { ProdutosModel } from "../../../domain/models/produto/produto";
import { CriarProdutosUseCase } from "../../../domain/useCases/produto/criar-produtos";
import { GrpcClient } from "../../contracts/grpc-client";
 
export class CriarProdutosService implements CriarProdutosUseCase {
    constructor(private readonly grpcClient: GrpcClient) { }
    async criar(data: CriarProdutoModel[]): Promise<ProdutosModel | Error> {
        const produtos = await this.grpcClient.call('produto.proto', process.env.GRPC_CONNECTION_PRODUTO, 'ProdutoService', 'criarLista', { produtos: data })
        return produtos
    }
}