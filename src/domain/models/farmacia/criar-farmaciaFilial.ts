import { FarmaciaModel } from "./farmacia";

export interface CriarFarmaciaFilialModel {
    id?: number
    farmacia: FarmaciaModel
    idFarmaciaSede: number
}