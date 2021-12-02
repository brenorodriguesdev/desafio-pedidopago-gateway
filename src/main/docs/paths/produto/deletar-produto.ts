export const deletarProdutoPath = {
    delete: {
        tags: ['Produto'],
        summary: 'API para deletar um produto',
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
                description: 'Produto deletado'
            }
        }
    }
}