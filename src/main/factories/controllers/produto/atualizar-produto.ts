import { AtualizarProdutoService } from "../../../../data/services/produto/atualizar-produto"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { AtualizarProdutoController } from "../../../../presentation/controllers/produto/atualizar-produto"
import { makeAtualizarProdutoValidator } from "../../validators/produto/atualizar-produto"

export const makeAtualizarProdutoController = (): Controller => {
    const atualizarProdutoService = new AtualizarProdutoService(new GRPC())
    return new AtualizarProdutoController(makeAtualizarProdutoValidator(), atualizarProdutoService)
}