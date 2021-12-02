export const criarFarmaciaSedeParamsSchema = {
    type: 'object',
    properties: {
        farmacia: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer'
                },
                logo: {
                    type: 'string'
                },
                nome: {
                    type: 'string'
                },
                cnpj: {
                    type: 'string'
                },
                endereco: {
                    type: 'string'
                },
                responsavel: {
                    type: 'string'
                },
                telefone: {
                    type: 'string'
                },
                outros: {
                    type: 'string'
                }
            }
        }
    },
    required: ['farmacia']
}
