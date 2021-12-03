import { ServerError } from "../errors/server-error";
import { HttpResponse } from "./http";

export const serverError = (): HttpResponse => ({
    data: new ServerError(),
    statusCode: 500
})

export const badRequest = (error: Error): HttpResponse => ({
    data: error,
    statusCode: 400
})

export const ok = (data: any): HttpResponse => ({
    data,
    statusCode: 200
})

export const noContent = (): HttpResponse => ({
    data: null,
    statusCode: 204
})

export const created = (): HttpResponse => ({
    data: null,
    statusCode: 201
})