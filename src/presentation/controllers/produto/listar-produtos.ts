import { ListarProdutosUseCase } from "../../../domain/useCases/produto/listar-produtos"
import { Controller } from "../../contracts/controller"
import { HttpResponse } from "../../contracts/http"
import { ok, serverError } from "../../contracts/http-helper"

export class ListarProdutosController implements Controller {
    constructor (private readonly listarProdutosUseCase: ListarProdutosUseCase) {}
    async handle (): Promise<HttpResponse> {
        try { 
            const produtos = await this.listarProdutosUseCase.listar()
            return ok(produtos)
        } catch (error) {
            return serverError()
        }
    }
}