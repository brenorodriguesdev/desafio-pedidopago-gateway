import { ProdutoModel } from "../../models/produto/produto";

export interface BuscarProdutoUseCase {
    buscar: (id: number) => Promise<ProdutoModel | Error>
}