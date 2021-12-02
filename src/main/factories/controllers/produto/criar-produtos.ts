import { CriarProdutosService } from "../../../../data/services/produto/criar-produtos"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { CriarProdutosController } from "../../../../presentation/controllers/produto/criar-produtos"
import { makeCriarProdutoValidator } from "../../validators/produto/criar-produto"

export const makeCriarProdutosController = (): Controller => {
    const criarProdutosService = new CriarProdutosService(new GRPC())
    return new CriarProdutosController(makeCriarProdutoValidator(), criarProdutosService)
}