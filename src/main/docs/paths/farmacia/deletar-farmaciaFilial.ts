export const deletarFarmaciaFilialPath = {
    delete: {
        tags: ['Farmacia'],
        summary: 'API para deletar uma farmacia filial',
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'ID da farmacia filial',
            required: true,
            schema: {
                type: 'integer'
            }
        }],
        responses: {
            200: {
                description: 'Farmacia filial deletada'
            }
        }
    }
}