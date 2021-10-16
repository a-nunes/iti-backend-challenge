import { PasswordValidator } from '@/domain/contracts'

type Input = { password: string }
export type PasswordValidation = (input: Input) => boolean
type Setup = (validator: PasswordValidator) => PasswordValidation

export const setupPasswordValidation: Setup = validator => ({ password }) => {
  if (password.length < 9) {
    return false
  }
  const blacklistRegex = /[_|~=`{}[\]:";'<>?,./ ]/g
  const hasBlacklistSymbol = password.match(blacklistRegex)
  if (hasBlacklistSymbol) {
    return false
  }
  const uniqueRegex = /^(?:([A-Za-z0-9!@#$%^&*()-+])(?!.*\1))*$/g
  const hasOnlyUniqueChars = password.match(uniqueRegex)
  if (!hasOnlyUniqueChars) {
    return false
  }
  return validator.isValid({ password })
}
