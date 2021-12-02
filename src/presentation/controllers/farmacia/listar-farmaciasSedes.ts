import { ListarFarmaciasSedesUseCase } from "../../../domain/useCases/farmacia/listar-farmaciasSedes"
import { Controller } from "../../contracts/controller"
import { HttpResponse } from "../../contracts/http"
import { ok, serverError } from "../../contracts/http-helper"

export class ListarFarmaciasSedesController implements Controller {
    constructor (private readonly listarFarmaciasSedesUseCase: ListarFarmaciasSedesUseCase) {}
    async handle (): Promise<HttpResponse> {
        try { 
            const farmacias = await this.listarFarmaciasSedesUseCase.listar()
            return ok(farmacias)
        } catch (error) {
            return serverError()
        }
    }
}