export const buscarFarmaciaPath = {
    get: {
        tags: ['Farmacia'],
        summary: 'API para retornar uma farmacia',
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'ID da farmacia',
            required: true,
            schema: {
                type: 'integer'
            }
        }],
        responses: {
            200: {
                description: 'Farmacia retornada'
            }
        }
    }
}