import { AtualizarFarmaciaService } from "../../../../data/services/farmacia/atualizar-farmacia"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { AtualizarFarmaciaController } from "../../../../presentation/controllers/farmacia/atualizar-farmacia"
import { makeAtualizarFarmaciaValidator } from "../../validators/farmacia/atualizar-farmacia"

export const makeAtualizarFarmaciaController = (): Controller => {
    const atualizarFarmaciaService = new AtualizarFarmaciaService(new GRPC())
    return new AtualizarFarmaciaController(makeAtualizarFarmaciaValidator(), atualizarFarmaciaService)
}