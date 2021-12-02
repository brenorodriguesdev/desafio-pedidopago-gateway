export const buscarProdutoPath = {
    get: {
        tags: ['Produto'],
        summary: 'API para retornar um produto',
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'ID do produto',
            required: true,
            schema: {
                type: 'integer'
            }
        }],
        responses: {
            200: {
                description: 'Produto retornado'
            }
        }
    }
}