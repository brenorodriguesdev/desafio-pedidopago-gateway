export const criarFarmaciaSedePath = {
    put: {
        tags: ['Farmacia'],
        summary: 'API para criar farmacia sede',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/criarFarmaciaSedeParams'
                    }
                }
            }
        },
        responses: {
            201: {
                description: 'Farmacia Sede criada'
            }
        }
    }
}