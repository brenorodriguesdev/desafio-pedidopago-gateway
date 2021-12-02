import { ClonarProdutoUseCase } from "../../../domain/useCases/produto/clonar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"

export class ClonarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly clonarProdutoUseCase: ClonarProdutoUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                id
            } = httpRequest.body

            const produto = await this.clonarProdutoUseCase.clonar(id)

            return ok(produto)
        } catch (error) {
            return badRequest(error)
        }
    }
}