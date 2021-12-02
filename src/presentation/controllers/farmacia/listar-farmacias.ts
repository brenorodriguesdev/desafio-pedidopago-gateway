import { ListarFarmaciasUseCase } from "../../../domain/useCases/farmacia/listar-farmacias"
import { Controller } from "../../contracts/controller"
import { HttpResponse } from "../../contracts/http"
import { ok, serverError } from "../../contracts/http-helper"

export class ListarFarmaciasController implements Controller {
    constructor (private readonly listarFarmaciasUseCase: ListarFarmaciasUseCase) {}
    async handle (): Promise<HttpResponse> {
        try { 
            const farmacias = await this.listarFarmaciasUseCase.listar()
            return ok(farmacias)
        } catch (error) {
            return serverError()
        }
    }
}