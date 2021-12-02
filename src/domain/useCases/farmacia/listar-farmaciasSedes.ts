import { ListarFarmaciasSedesModel } from "../../models/farmacia/listar-farmaciasSedes";

export interface ListarFarmaciasSedesUseCase {
    listar: () => Promise<ListarFarmaciasSedesModel>
}