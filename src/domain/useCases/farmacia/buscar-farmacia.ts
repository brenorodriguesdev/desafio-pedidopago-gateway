import { FarmaciaModel } from "../../models/farmacia/farmacia";

export interface BuscarFarmaciaUseCase {
    buscar: (id: number) => Promise<FarmaciaModel | Error>
}