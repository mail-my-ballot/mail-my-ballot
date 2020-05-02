import { toEmailData } from '.'
import { createMock } from 'ts-auto-mock'
import { FloridaInfo, MichiganInfo, StateInfo, GeorgiaInfo, WisconsinInfo } from "../../common"

const email = 'email@example.com'

const check = (info: StateInfo, checkSignature = false): void => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const officialsEmails = ['email@example.com']
  const confirmationId = 'abc123'

  const emailDataProd = toEmailData(info, confirmationId, officialsEmails, { forceEmailOfficials: true })
  expect(emailDataProd).toBeTruthy()
  expect(emailDataProd!.to.length).toBeGreaterThanOrEqual(2)
  expect(emailDataProd!.to).toContain(email)
  expect(emailDataProd!.md).toContain(confirmationId)
  
  const emailData = toEmailData(info, confirmationId, officialsEmails)
  expect(emailData).toBeTruthy()
  expect(emailData!.to).toEqual([email])
  expect(emailData!.md).toContain(confirmationId)

  if (checkSignature) {
    expect(emailData!.signature).toBeTruthy()
  }
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
    signature: 'signature',
    email,
  })

  check(info, true)
})

test('georgia', () => {
  const info = createMock<GeorgiaInfo>({
    county: 'Fulton County',
    email,
  })

  check(info)
})

test('wisconsin', () => {
  const info = createMock<WisconsinInfo>({
    city: 'Green Bay',
    county: 'Brown County',
    email,
  })

  check(info)
})
