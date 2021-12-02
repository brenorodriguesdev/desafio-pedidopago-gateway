import { FarmaciaModel } from "../../models/farmacia/farmacia";

export interface CriarFarmaciaUseCase {
    criar: (data: FarmaciaModel) => Promise<FarmaciaModel | Error>
}