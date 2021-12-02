export const listarFarmaciasPath = {
    get: {
        tags: ['Farmacia'],
        summary: 'API para retornar farmacias',
        responses: {
            200: {
                description: 'Farmacias retornadas'
            }
        }
    }
}