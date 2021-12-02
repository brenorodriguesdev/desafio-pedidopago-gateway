import { ClonarProdutoService } from "../../../../data/services/produto/clonar-produto"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { ClonarProdutoController } from "../../../../presentation/controllers/produto/clonar-produto"
import { makeClonarProdutoValidator } from "../../validators/produto/clonar-produto"

export const makeClonarProdutoController = (): Controller => {
    const clonarProdutoService = new ClonarProdutoService(new GRPC())
    return new ClonarProdutoController(makeClonarProdutoValidator(), clonarProdutoService)
}