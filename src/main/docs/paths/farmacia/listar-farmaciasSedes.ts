export const listarFarmaciasSedesPath = {
    get: {
        tags: ['Farmacia'],
        summary: 'API para retornar farmacias sedes',
        responses: {
            200: {
                description: 'Farmacias Sedes retornadas'
            }
        }
    }
}