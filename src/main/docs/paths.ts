import { 
    atualizarProdutoPath, 
    buscarProdutoPath, 
    clonarProdutoPath, 
    criarProdutoPath, 
    criarProdutosPath, 
    deletarProdutoPath, 
    listarProdutosPath 
} from "./paths/";

export default {
    '/atualizarProduto': atualizarProdutoPath,
    '/buscarProduto/{id}': buscarProdutoPath,
    '/clonarProduto': clonarProdutoPath,
    '/criarProduto': criarProdutoPath,
    '/criarProdutos': criarProdutosPath,
    '/deletarProduto/{id}': deletarProdutoPath,
    '/listarProdutos': listarProdutosPath,
}