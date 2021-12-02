import { AtualizarProdutoModel } from "../../models/produto/atualizar-produto";

export interface AtualizarProdutoUseCase {
    atualizar: (data: AtualizarProdutoModel) => Promise<void | Error>
}