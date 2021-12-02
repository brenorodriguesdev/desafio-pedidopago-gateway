import { CriarFarmaciaUseCase } from "../../../domain/useCases/farmacia/criar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"

export class CriarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaUseCase: CriarFarmaciaUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                logo,
                nome,
                cnpj,
                endereco,
                horarioFuncionamento,
                responsavel,
                telefone,
                outros
            } = httpRequest.body

            const farmacia = await this.criarFarmaciaUseCase.criar({
                logo,
                nome,
                cnpj,
                endereco,
                horarioFuncionamento,
                responsavel,
                telefone,
                outros
            })

            return ok(farmacia)
        } catch (error) {
            return badRequest(error)
        }
    }
}