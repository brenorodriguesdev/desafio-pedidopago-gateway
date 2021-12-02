import { ListarFarmaciasModel } from "../models/listar-farmacias";

export interface ListarFarmaciasUseCase {
    listar: () => Promise<ListarFarmaciasModel>
}