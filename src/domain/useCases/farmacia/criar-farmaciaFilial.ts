import { CriarFarmaciaFilialModel } from "../../models/farmacia/criar-farmaciaFilial";

export interface CriarFarmaciaFilialUseCase {
    criar: (data: CriarFarmaciaFilialModel) => Promise<void | Error>
}