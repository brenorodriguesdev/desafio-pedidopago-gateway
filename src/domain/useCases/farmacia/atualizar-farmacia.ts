import { UpdateFarmaciaModel } from "../../models/farmacia/updateFarmacia";

export interface AtualizarFarmaciaUseCase {
    atualizar: (data: UpdateFarmaciaModel) => Promise<void | Error>
}