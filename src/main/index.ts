import './config/module-alias'
import 'dotenv/config'
import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

import validator from 'validator'
import 'reflect-metadata'

const options = {
  minLength: 9,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: true,
  pointsPerUnique: 0,
  pointsPerRepeat: 1,
  pointsForContainingLower: 0,
  pointsForContainingUpper: 0,
  pointsForContainingNumber: 0,
  pointsForContainingSymbol: 0
}
const blacklistRegex = /[_|~=`{}[\]:";'<>?,./ ]/g

app.post('/', (req, res) => {
  const { password } = req.body
  const hasBlacklistSymbol = password.match(blacklistRegex)
  if (hasBlacklistSymbol) {
    res.send(false)
    return
  }
  const points = validator.isStrongPassword(password, options) as unknown
  if (password.length < 9 || points as number > 0) {
    res.send(false)
    return
  }
  res.send(true)
})
app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}/`)
})
