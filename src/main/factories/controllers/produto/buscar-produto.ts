import { AtualizarProdutoService } from "../../../../data/services/produto/atualizar-produto"
import { BuscarProdutoService } from "../../../../data/services/produto/buscar-produto"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { BuscarProdutoController } from "../../../../presentation/controllers/produto/buscar-produto"
import { makeBuscarProdutoValidator } from "../../validators/produto/buscar-produto"

export const makeBuscarProdutoController = (): Controller => {
    const buscarProdutoService = new BuscarProdutoService(new GRPC())
    return new BuscarProdutoController(makeBuscarProdutoValidator(), buscarProdutoService)
}