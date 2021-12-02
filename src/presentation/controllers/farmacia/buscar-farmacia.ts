import { BuscarFarmaciaUseCase } from "../../../domain/useCases/farmacia/buscar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"

export class BuscarFarmaciaController implements Controller {
    constructor (private readonly validator: Validator, private readonly buscarFarmaciaUseCase: BuscarFarmaciaUseCase) {}
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.params)
            if (error) {
                return badRequest(error)
            }

            const { id } = httpRequest.params
            
            const farmacia = await this.buscarFarmaciaUseCase.buscar(id)

            return ok(farmacia)
        } catch (error) {
            return badRequest(error)
        }
    }
}