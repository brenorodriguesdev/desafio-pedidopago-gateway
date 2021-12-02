import { CriarFarmaciaFilialService } from "../../../../data/services/farmacia/criar-farmaciaFilial"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { CriarFarmaciaFilialController } from "../../../../presentation/controllers/farmacia/criar-farmaciaFilial"
import { makeCriarFarmaciaFilialValidator } from "../../validators/farmacia/criar-farmaciaFilial"

export const makeCriarFarmaciaFilialController = (): Controller => {
    const criarFarmaciaFilialService = new CriarFarmaciaFilialService(new GRPC())
    return new CriarFarmaciaFilialController(makeCriarFarmaciaFilialValidator(), criarFarmaciaFilialService)
}