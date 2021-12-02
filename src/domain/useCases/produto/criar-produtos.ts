import { CriarProdutoModel } from "../../models/produto/criar-produtos";
import { ProdutoModel, ProdutosModel } from "../../models/produto/produto";

export interface CriarProdutosUseCase {
    criar: (data: CriarProdutoModel[]) => Promise<ProdutosModel | Error>
}

export interface CriarProdutoUseCase {
    criar: (data: CriarProdutoModel) => Promise<ProdutoModel | Error>
}