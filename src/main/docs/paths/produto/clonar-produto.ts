export const clonarProdutoPath = {
    post: {
        tags: ['Produto'],
        summary: 'API para clonar produto',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/clonarProdutoParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Produto retornado'
            }
        }
    }
}