import { ProdutosModel } from "../../models/produto/produto";

export interface ListarProdutosUseCase {
    listar: () => Promise<ProdutosModel>
}