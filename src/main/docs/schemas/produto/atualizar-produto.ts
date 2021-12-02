export const atualizarProdutoParamsSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        thumbnail: {
            type: 'string'
        },
        nome: {
            type: 'string'
        },
        preco: {
            type: 'string'
        },
        ingredientes: {
            type: 'array',
            items: 'integer'
        },
        disponibilidade: {
            type: 'string'
        },
        volume: {
            type: 'string'
        },
        outros: {
            type: 'string'
        }
    },
    required: ['id', 'thumbnail', 'nome', 'preco', 'ingredientes', 'disponibilidade', 'volume']
}
