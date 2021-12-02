import { BuscarFarmaciaUseCase } from "../../../domain/useCases/farmacia/buscar-farmacia"
import { BuscarProdutoUseCase } from "../../../domain/useCases/produto/buscar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"

export class BuscarProdutoController implements Controller {
    constructor (private readonly validator: Validator, private readonly buscarProdutoUseCase: BuscarProdutoUseCase) {}
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.params)
            if (error) {
                return badRequest(error)
            }

            const { id } = httpRequest.params
            
            const produto = await this.buscarProdutoUseCase.buscar(id)

            return ok(produto)
        } catch (error) {
            return badRequest(error)
        }
    }
}