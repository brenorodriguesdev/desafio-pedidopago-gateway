import { ProdutoModel } from "../../models/produto/produto";

export interface ClonarProdutoUseCase {
    clonar: (id: number) => Promise<ProdutoModel | Error>
}