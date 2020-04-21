import { toEmailData } from '.'
import { createMock } from 'ts-auto-mock'
import { FloridaInfo, MichiganInfo, StateInfo } from "../../common"

const email = 'email@example.com'

const check = (info: StateInfo): void => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const emailDataProd = toEmailData(info, { forceEmailOfficials: true })
  expect(emailDataProd).toBeTruthy()
  expect(emailDataProd!.to.length).toBeGreaterThanOrEqual(2)
  expect(emailDataProd!.to).toContain(email)
  
  const emailData = toEmailData(info)
  expect(emailData).toBeTruthy()
  expect(emailData!.to).toEqual([email])
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
}

test('florida', () => {
  const info = createMock<FloridaInfo>({
    county: 'Miami-Dade County',
    email,
  })

  check(info)
})

test('michigan', () => {
  const info = createMock<MichiganInfo>({
    city: 'Grand Rapids City',
    county: 'Kent County',
    email,
  })

  check(info)
})
