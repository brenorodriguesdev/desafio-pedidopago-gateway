import { CriarFarmaciaFilialModel } from "../models/criar-farmaciaFilial";

export interface CriarFarmaciaFilialUseCase {
    criar: (data: CriarFarmaciaFilialModel) => Promise<void | Error>
}