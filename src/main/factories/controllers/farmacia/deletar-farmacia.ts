import { DeletarFarmaciaService } from "../../../../data/services/farmacia/deletar-farmacia"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { DeletarFarmaciaController } from "../../../../presentation/controllers/farmacia/deletar-farmacia"
import { makeDeletarFarmaciaValidator } from "../../validators/farmacia/deletar-farmacia"

export const makeDeletarFarmaciaController = (): Controller => {
    const deletarFarmaciaService = new DeletarFarmaciaService(new GRPC())
    return new DeletarFarmaciaController(makeDeletarFarmaciaValidator(), deletarFarmaciaService)
}