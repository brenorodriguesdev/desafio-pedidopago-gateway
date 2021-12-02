import { adaptRouter } from "../adapters/express-controller"
import { Router } from "express"
import { makeAtualizarProdutoController } from "../factories/controllers/produto/atualizar-produto"
import { makeBuscarProdutoController } from "../factories/controllers/produto/buscar-produto"
import { makeClonarProdutoController } from "../factories/controllers/produto/clonar-produto"
import { makeCriarProdutoController } from "../factories/controllers/produto/criar-produto"
import { makeCriarProdutosController } from "../factories/controllers/produto/criar-produtos"
import { makeDeletarProdutoController } from "../factories/controllers/produto/deletar-produto"
import { makeListarProdutosController } from "../factories/controllers/produto/listar-produtos"

export default (router: Router): void => {
    router.put('/atualizarProduto', adaptRouter(makeAtualizarProdutoController()))
    router.get('/buscarProduto/:id', adaptRouter(makeBuscarProdutoController()))
    router.post('/clonarProduto', adaptRouter(makeClonarProdutoController()))
    router.post('/criarProduto', adaptRouter(makeCriarProdutoController()))
    router.post('/criarProdutos', adaptRouter(makeCriarProdutosController()))
    router.delete('/deletarProduto/:id', adaptRouter(makeDeletarProdutoController()))
    router.get('/listarProdutos', adaptRouter(makeListarProdutosController()))
}