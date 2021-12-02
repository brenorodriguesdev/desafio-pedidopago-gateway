export const criarProdutoParamsSchema = {
    type: 'object',
    properties: {
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
    required: ['thumbnail', 'nome', 'preco', 'ingredientes', 'disponibilidade', 'volume']
}
