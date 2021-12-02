export interface DeletarFarmaciaFilialUseCase {
    deletar: (id: number) => Promise<void | Error>
}