import { BuscarFarmaciaService } from "../../../../data/services/farmacia/buscar-farmacia"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { BuscarFarmaciaController } from "../../../../presentation/controllers/farmacia/buscar-farmacia"
import { makeBuscarFarmaciaValidator } from "../../validators/farmacia/buscar-farmacia"

export const makeBuscarFarmaciaController = (): Controller => {
    const buscarFarmaciaService = new BuscarFarmaciaService(new GRPC())
    return new BuscarFarmaciaController(makeBuscarFarmaciaValidator(), buscarFarmaciaService)
}