import { DeletarFarmaciaUseCase } from "../../../domain/useCases/farmacia/deletar-farmacia"
import { DeletarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/deletar-farmaciaFilial"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"

export class DeletarFarmaciaFilialController implements Controller {
    constructor (private readonly validator: Validator, private readonly deletarFarmaciaFilialUseCase: DeletarFarmaciaFilialUseCase) {}
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.params)
            if (error) {
                return badRequest(error)
            }

            const { id } = httpRequest.params
            
            await this.deletarFarmaciaFilialUseCase.deletar(id)

            return noContent()
        } catch (error) {
            return badRequest(error)
        }
    }
}