import { ListarProdutosService } from "../../../../data/services/produto/listar-produtos"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { ListarProdutosController } from "../../../../presentation/controllers/produto/listar-produtos"

export const makeListarProdutosController = (): Controller => {
    const listarProdutosService = new ListarProdutosService(new GRPC())
    return new ListarProdutosController(listarProdutosService)
}