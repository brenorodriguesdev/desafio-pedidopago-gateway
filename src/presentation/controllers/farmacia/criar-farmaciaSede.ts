import { CriarFarmaciaFilialUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaFilial"
import { CriarFarmaciaSedeUseCase } from "../../../domain/useCases/farmacia/criar-farmaciaSede"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, created } from "../../contracts/http-helper"

export class CriarFarmaciaSedeController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaSedeUseCase: CriarFarmaciaSedeUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                farmacia,
            } = httpRequest.body

            await this.criarFarmaciaSedeUseCase.criar({
                farmacia
            })

            return created()
        } catch (error) {
            return badRequest(error)
        }
    }
}