import { Validator } from "../../../../validation/contracts/validator"
import { RequiredFieldValidator } from "../../../../validation/validators/required-field"
import { ValidatorComposite } from "../../../../validation/validators/validator-composite"

export const makeCriarFarmaciaValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const requiredFields = ['logo', 'nome', 'cnpj', 'endereco', 'horarioFuncionamento', 'responsavel', 'telefone']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidator(field))
    }
    return new ValidatorComposite(validations)
  }