import { UpdateFarmaciaModel } from "../models/updateFarmacia";

export interface AtualizarFarmaciaUseCase {
    atualizar: (data: UpdateFarmaciaModel) => Promise<void | Error>
}