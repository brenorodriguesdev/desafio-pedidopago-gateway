import { FarmaciaModel } from "../models/farmacia";

export interface CriarFarmaciaUseCase {
    criar: (data: FarmaciaModel) => Promise<FarmaciaModel | Error>
}