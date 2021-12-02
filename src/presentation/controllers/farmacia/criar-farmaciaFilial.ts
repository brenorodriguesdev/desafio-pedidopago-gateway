import { CriarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaFilial"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, created } from "../../contracts/http-helper"

export class CriarFarmaciaFilialController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaFilialUseCase: CriarFarmaciaFilialUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                farmacia,
                idFarmaciaSede,
            } = httpRequest.body

            await this.criarFarmaciaFilialUseCase.criar({
                farmacia,
                idFarmaciaSede
            })

            return created()
        } catch (error) {
            return badRequest(error)
        }
    }
}