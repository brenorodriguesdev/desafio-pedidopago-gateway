import { CriarFarmaciaSedeService } from "../../../../data/services/farmacia/criar-farmaciaSede"
import { GRPC } from "../../../../infra/grpc"
import { Controller } from "../../../../presentation/contracts/controller"
import { CriarFarmaciaSedeController } from "../../../../presentation/controllers/farmacia/criar-farmaciaSede"
import { makeCriarFarmaciaFilialValidator } from "../../validators/farmacia/criar-farmaciaFilial"

export const makeCriarFarmaciaSedeController = (): Controller => {
    const criarFarmaciaFilialService = new CriarFarmaciaSedeService(new GRPC())
    return new CriarFarmaciaSedeController(makeCriarFarmaciaFilialValidator(), criarFarmaciaFilialService)
}