export interface PasswordValidator {
  validate(input: PasswordValidator.Input): PasswordValidator.Output
}

export namespace PasswordValidator {
  export type Input = { password: string }
  export type Output = boolean
}
