export const atualizarProdutoPath = {
    put: {
        tags: ['Produto'],
        summary: 'API para atualizar produto',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/atualizarProdutoParams'
                    }
                }
            }
        },
        responses: {
            204: {
                description: 'Produto alterado'
            }
        }
    }
}