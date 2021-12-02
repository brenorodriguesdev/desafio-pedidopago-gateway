export const criarFarmaciaPath = {
    put: {
        tags: ['Farmacia'],
        summary: 'API para criar farmacia',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/criarFarmaciaParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Farmacia retornada'
            }
        }
    }
}