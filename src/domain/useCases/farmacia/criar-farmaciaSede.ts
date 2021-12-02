import { FarmaciaSedeModel } from "../../models/farmacia/farmaciaSede";

export interface CriarFarmaciaSedeUseCase {
    criar: (data : FarmaciaSedeModel) => Promise<void | Error>
}