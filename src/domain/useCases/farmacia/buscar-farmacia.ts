import { FarmaciaModel } from "../models/farmacia";

export interface BuscarFarmaciaUseCase {
    buscar: (id: number) => Promise<FarmaciaModel | Error>
}