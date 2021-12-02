import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Desafio Traux API',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Produto',
    description: 'APIs de Produto',
  },
  {
    name: 'Farmacia',
    description: 'APIs de Farmacia',
  }],
  paths,
  schemas
}