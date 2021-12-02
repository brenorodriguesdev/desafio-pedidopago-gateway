import { FarmaciaSedeModel } from "../models/farmaciaSede";

export interface CriarFarmaciaSedeUseCase {
    criar: (data : FarmaciaSedeModel) => Promise<void | Error>
}