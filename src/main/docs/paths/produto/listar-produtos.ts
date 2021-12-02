export const listarProdutosPath = {
    get: {
        tags: ['Produto'],
        summary: 'API para retornar produtos',
        responses: {
            200: {
                description: 'Produtos retornados'
            }
        }
    }
}