import { CriarFarmaciaService } from "../../../../data/services/farmacia/criar-farmacia"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { CriarFarmaciaController } from "../../../../presentation/controllers/farmacia/criar-farmacia"
import { makeCriarFarmaciaValidator } from "../../validators/farmacia/criar-farmacia"

export const makeCriarFarmaciaController = (): Controller => {
    const criarFarmaciaService = new CriarFarmaciaService(new GRPC())
    return new CriarFarmaciaController(makeCriarFarmaciaValidator(), criarFarmaciaService)
}