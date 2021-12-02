import { ListarFarmaciasSedesService } from "../../../../data/services/farmacia/listar-farmaciasSedes"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { ListarFarmaciasSedesController } from "../../../../presentation/controllers/farmacia/listar-farmaciasSedes"

export const makeListarFarmaciasSedesController = (): Controller => {
    const listarFarmaciasSedesService = new ListarFarmaciasSedesService(new GRPC())
    return new ListarFarmaciasSedesController(listarFarmaciasSedesService)
}