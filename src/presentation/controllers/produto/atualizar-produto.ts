import { AtualizarProdutoUseCase } from "../../../domain/useCases/produto/atualizar-produto"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, noContent } from "../../contracts/http-helper"

export class AtualizarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly atualizarProdutoUseCase: AtualizarProdutoUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                id,
                thumbnail,
                nome,
                preco,
                ingredientes,
                disponibilidade,
                volume,
                outros
            } = httpRequest.body

           await this.atualizarProdutoUseCase.atualizar({
                id,
                thumbnail,
                nome,
                preco,
                ingredientes,
                disponibilidade,
                volume,
                outros
            })

            return noContent()
        } catch (error) {
            return badRequest(error)
        }
    }
}