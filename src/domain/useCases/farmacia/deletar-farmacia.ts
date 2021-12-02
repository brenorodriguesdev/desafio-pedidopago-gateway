export interface DeletarFarmaciaUseCase {
    deletar: (id: number) => Promise<void | Error>
}