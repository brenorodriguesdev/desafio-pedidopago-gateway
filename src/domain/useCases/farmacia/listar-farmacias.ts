import { ListarFarmaciasModel } from "../../models/farmacia/listar-farmacias";

export interface ListarFarmaciasUseCase {
    listar: () => Promise<ListarFarmaciasModel>
}