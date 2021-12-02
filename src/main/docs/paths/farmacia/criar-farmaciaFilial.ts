export const criarFarmaciaFilialPath = {
    put: {
        tags: ['Farmacia'],
        summary: 'API para criar farmacia filial',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/criarFarmaciaFilialParams'
                    }
                }
            }
        },
        responses: {
            201: {
                description: 'Farmacia filial criada'
            }
        }
    }
}