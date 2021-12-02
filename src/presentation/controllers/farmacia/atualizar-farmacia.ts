import { AtualizarFarmaciaUseCase } from "../../../domain/useCases/farmacia/atualizar-farmacia"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"

export class AtualizarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly atualizarFarmaciaUseCase: AtualizarFarmaciaUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                id,
                logo,
                nome,
                cnpj,
                endereco,
                horarioFuncionamento,
                responsavel,
                telefone,
                outros
            } = httpRequest.body

            await this.atualizarFarmaciaUseCase.atualizar({
                id,
                logo,
                nome,
                cnpj,
                endereco,
                horarioFuncionamento,
                responsavel,
                telefone,
                outros
            })

            return noContent()
        } catch (error) {
            return badRequest(error)
        }
    }
}