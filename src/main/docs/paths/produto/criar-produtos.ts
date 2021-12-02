export const criarProdutosPath = {
    post: {
        tags: ['Produto'],
        summary: 'API para criar produtos',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/criarProdutosParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Produtos retornados'
            }
        }
    }
}