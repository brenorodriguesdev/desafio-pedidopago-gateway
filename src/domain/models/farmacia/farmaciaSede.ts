import { FarmaciaModel } from "./farmacia";

export interface FarmaciaSedeModel {
    id?: number
    farmacia: FarmaciaModel
    filias?: FarmaciaModel[]
}