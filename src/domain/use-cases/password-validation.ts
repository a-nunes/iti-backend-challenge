import { PasswordValidator } from '@/domain/contracts'

type Input = { password: string }
export type PasswordValidation = (input: Input) => boolean
type Setup = (validator: PasswordValidator) => PasswordValidation

export const setupPasswordValidation: Setup = validator => ({ password }) => {
  const blacklistRegex = /[_|~=`{}[\]:";'<>?,./ ]/g
  const uniqueRegex = /^(?:([A-Za-z0-9!@#$%^&*()-+])(?!.*\1))*$/g
  const hasBlacklistSymbol = password.match(blacklistRegex)
  const hasOnlyUniqueChars = password.match(uniqueRegex)
  if (hasBlacklistSymbol || password.length < 9 || !hasOnlyUniqueChars) {
    return false
  }
  return validator.isValid({ password })
}
