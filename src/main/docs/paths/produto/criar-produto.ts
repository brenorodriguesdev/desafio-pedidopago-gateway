export const criarProdutoPath = {
    post: {
        tags: ['Produto'],
        summary: 'API para criar produto',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/criarProdutoParams'
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