import { CriarProdutosUseCase, CriarProdutoUseCase } from "../../../domain/useCases/produto/criar-produtos"
import { Validator } from "../../../validation/contracts/validator"
import { Controller } from "../../contracts/controller"
import { HttpRequest, HttpResponse } from "../../contracts/http"
import { badRequest, ok } from "../../contracts/http-helper"
import { MissingParamError } from "../../errors/missing-param-error"

export class CriarProdutosController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarProdutosUseCase: CriarProdutosUseCase) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            if (!httpRequest.body.produtos) {
                return badRequest(new MissingParamError('produtos'))
            }
    
            for (let produto of httpRequest.body.produtos) {
                const error = this.validator.validate(produto)
                if (error) {
                    return badRequest(error)
                }
            }

            const {
                produtos
            } = httpRequest.body

            const produtoLista = await this.criarProdutosUseCase.criar(produtos)

            return ok(produtoLista)
        } catch (error) {
            return badRequest(error)
        }
    }
}