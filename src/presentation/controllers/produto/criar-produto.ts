import { CriarProdutoUseCase } from "../../../domain/useCases/produto/criar-produtos"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"

export class CriarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarProdutoUseCase: CriarProdutoUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const {
                thumbnail,
                nome,
                preco,
                ingredientes,
                disponibilidade,
                volume,
                outros
            } = httpRequest.body

            const produto = await this.criarProdutoUseCase.criar({
                thumbnail,
                nome,
                preco,
                ingredientes,
                disponibilidade,
                volume,
                outros
            })

            return ok(produto)
        } catch (error) {
            return badRequest(error)
        }
    }
}