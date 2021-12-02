import { 
    atualizarProdutoPath, 
    buscarProdutoPath, 
    clonarProdutoPath, 
    criarProdutoPath, 
    criarProdutosPath, 
    deletarProdutoPath, 
    listarProdutosPath,
    atualizarFarmaciaPath,
    buscarFarmaciaPath,
    criarFarmaciaPath,
    criarFarmaciaFilialPath,
    criarFarmaciaSedePath,
    deletarFarmaciaPath,
    deletarFarmaciaFilialPath,
    listarFarmaciasPath,
    listarFarmaciasSedesPath
} from "./paths/";

export default {
    '/atualizarProduto': atualizarProdutoPath,
    '/buscarProduto/{id}': buscarProdutoPath,
    '/clonarProduto': clonarProdutoPath,
    '/criarProduto': criarProdutoPath,
    '/criarProdutos': criarProdutosPath,
    '/deletarProduto/{id}': deletarProdutoPath,
    '/listarProdutos': listarProdutosPath,
    '/atualizarFarmacia': atualizarFarmaciaPath,
    '/buscarFarmacia/{id}': buscarFarmaciaPath,
    '/criarFarmacia': criarFarmaciaPath,
    '/criarFarmaciaFilial': criarFarmaciaFilialPath,
    '/criarFarmaciaSede': criarFarmaciaSedePath,
    '/deletarFarmacia/{id}': deletarFarmaciaPath,
    '/deletarFarmaciaFilial/{id}': deletarFarmaciaFilialPath,
    '/listarFarmacias': listarFarmaciasPath,
    '/listarFarmaciasSedes': listarFarmaciasSedesPath,
}