import { DeletarFarmaciaFilialService } from "../../../../data/services/farmacia/deletar-farmaciaFilial"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { DeletarFarmaciaFilialController } from "../../../../presentation/controllers/farmacia/deletar-farmaciaFilial"
import { makeDeletarFarmaciaFilialValidator } from "../../validators/farmacia/deletar-farmaciaFilial"

export const makeDeletarFarmaciaFilialController = (): Controller => {
    const deletarFarmaciaFilialService = new DeletarFarmaciaFilialService(new GRPC())
    return new DeletarFarmaciaFilialController(makeDeletarFarmaciaFilialValidator(), deletarFarmaciaFilialService)
}