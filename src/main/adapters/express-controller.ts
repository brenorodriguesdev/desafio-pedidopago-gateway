import { Controller } from "../../presentation/contracts/controller"
import { HttpRequest } from "../../presentation/contracts/http"
import { Request, Response } from 'express'

export const adaptRouter = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params
        }
        const httpResponse = await controller.handle(httpRequest)
        if (httpResponse.statusCode !== 200 && httpResponse.statusCode !== 201 && httpResponse.statusCode !== 204) {
            res.status(httpResponse.statusCode).json({ message: httpResponse.data.message })
        } else {
            res.status(httpResponse.statusCode).json(httpResponse.data)
        }
    }
}