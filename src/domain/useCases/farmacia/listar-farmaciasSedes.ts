import { ListarFarmaciasSedesModel } from "../models/listar-farmaciasSedes";

export interface ListarFarmaciasSedesUseCase {
    listar: () => Promise<ListarFarmaciasSedesModel>
}