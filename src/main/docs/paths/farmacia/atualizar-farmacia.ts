export const atualizarFarmaciaPath = {
    put: {
        tags: ['Farmacia'],
        summary: 'API para atualizar farmacia',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/atualizarFarmaciaParams'
                    }
                }
            }
        },
        responses: {
            204: {
                description: 'Farmacia alterada'
            }
        }
    }
}