import { ListarFarmaciasService } from "../../../../data/services/farmacia/listar-farmacias"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { ListarFarmaciasController } from "../../../../presentation/controllers/farmacia/listar-farmacias"

export const makeListarFarmaciasController = (): Controller => {
    const listarFarmaciasService = new ListarFarmaciasService(new GRPC())
    return new ListarFarmaciasController(listarFarmaciasService)
}