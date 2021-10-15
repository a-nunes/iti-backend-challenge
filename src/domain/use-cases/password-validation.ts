import { PasswordValidator } from '@/domain/contracts'

type Input = { password: string }
export type PasswordValidation = (input: Input) => boolean
type Setup = (validator: PasswordValidator) => PasswordValidation

export const setupPasswordValidation: Setup = validator => ({ password }) => {
  const blacklistRegex = /[_|~=`{}[\]:";'<>?,./ ]/g
  const hasBlacklistSymbol = password.match(blacklistRegex)
  if (hasBlacklistSymbol || password.length < 9) {
    return false
  }
  return validator.validate({ password })
}
