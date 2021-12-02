export const clonarProdutoParamsSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        }
    },
    required: ['id']
}
