import { CriarProdutoService } from "../../../../data/services/produto/criar-produto"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { CriarProdutoController } from "../../../../presentation/controllers/produto/criar-produto"
import { makeCriarProdutoValidator } from "../../validators/produto/criar-produto"

export const makeCriarProdutoController = (): Controller => {
    const criarProdutoService = new CriarProdutoService(new GRPC())
    return new CriarProdutoController(makeCriarProdutoValidator(), criarProdutoService)
}