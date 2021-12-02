import { adaptRouter } from "../adapters/express-controller"
import { Router } from "express"
import { makeAtualizarFarmaciaController } from "../factories/controllers/farmacia/atualizar-farmacia"
import { makeBuscarFarmaciaController } from "../factories/controllers/farmacia/buscar-farmacia"
import { makeCriarFarmaciaController } from "../factories/controllers/farmacia/criar-farmacia"
import { makeCriarFarmaciaFilialController } from "../factories/controllers/farmacia/criar-farmaciaFilial"
import { makeCriarFarmaciaSedeController } from "../factories/controllers/farmacia/criar-farmaciaSede"
import { makeDeletarFarmaciaController } from "../factories/controllers/farmacia/deletar-farmacia"
import { makeDeletarFarmaciaFilialController } from "../factories/controllers/farmacia/deletar-farmaciaFilial"
import { makeListarFarmaciasController } from "../factories/controllers/farmacia/listar-farmacias"
import { makeListarFarmaciasSedesController } from "../factories/controllers/farmacia/listar-farmaciasSedes"

export default (router: Router): void => {
    router.put('/atualizarFarmacia', adaptRouter(makeAtualizarFarmaciaController()))
    router.get('/buscarFarmacia/:id', adaptRouter(makeBuscarFarmaciaController()))
    router.post('/criarFarmacia', adaptRouter(makeCriarFarmaciaController()))
    router.post('/criarFarmaciaFilial', adaptRouter(makeCriarFarmaciaFilialController()))
    router.post('/criarFarmaciaSede', adaptRouter(makeCriarFarmaciaSedeController()))
    router.delete('/deletarFarmacia/:id', adaptRouter(makeDeletarFarmaciaController()))
    router.delete('/deletarFarmaciaFilial/:id', adaptRouter(makeDeletarFarmaciaFilialController()))
    router.get('/listarFarmacias', adaptRouter(makeListarFarmaciasController()))
    router.get('/listarFarmaciasSedes', adaptRouter(makeListarFarmaciasSedesController()))
}