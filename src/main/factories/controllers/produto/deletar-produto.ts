import { DeletarProdutoService } from "../../../../data/services/produto/deletar-produto"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { DeletarProdutoController } from "../../../../presentation/controllers/produto/deletar-produto"
import { makeDeletarProdutoValidator } from "../../validators/produto/deletar-produto"

export const makeDeletarProdutoController = (): Controller => {
    const deletarProdutoService = new DeletarProdutoService(new GRPC())
    return new DeletarProdutoController(makeDeletarProdutoValidator(), deletarProdutoService)
}