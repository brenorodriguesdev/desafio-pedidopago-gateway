export const deletarFarmaciaPath = {
    delete: {
        tags: ['Farmacia'],
        summary: 'API para deletar uma farmacia',
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
                description: 'Farmacia deletada'
            }
        }
    }
}